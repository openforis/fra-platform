import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'

import { Areas, CountryIso, RegionCode, RegionGroupName } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'

import { getContent } from 'server/controller/cycleData/getBulkDownload/getContent'
import { getContentVariables } from 'server/controller/cycleData/getBulkDownload/getContentVariables'
import { getFraYearsData } from 'server/controller/cycleData/getBulkDownload/getFRAYearsData'
import { CountryRepository } from 'server/repository/assessmentCycle/country'
import { RegionRepository } from 'server/repository/assessmentCycle/region'

import { entries as annualEntries } from './entries/AnnualData'
import { entries as FRAEntries } from './entries/FRAYears'
import { entries as intervalEntries } from './entries/Intervals'

const _convertToCSV = (arr: Array<Record<string, string>>): string => {
  if (arr.length === 0) return ''
  const headers = Object.keys(arr[0]).filter((key) => !/^\d/.test(key))
  const header = [...headers, ...Object.keys(arr[0]).filter((key) => !headers.includes(key))]
  const csvContent = [header, ...arr.map((it) => header.map((header) => it[header] ?? ''))]
  return csvContent.map((row) => row.join(',')).join('\n')
}

// Get csv file name with timestamp
const _getFileName = (name: string): string => {
  const date = new Date()
  const year = date.getFullYear()
  const month =
    (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : `0${(date.getMonth() + 1).toString()}`
  const day = date.getDate().toString().length > 1 ? date.getDate() : `0${date.getDate().toString()}`
  const timestamp = `${year}_${month}_${day}`
  return `${name}_${timestamp}.csv`
}

const handleResult = ({ regions, iso3, name, year, ...row }: Record<string, string>, i18n: i18nType) => {
  const _translate = (key: string) => i18n.t<string>(Areas.getTranslationKey(key as RegionCode | CountryIso))

  const _handleRegions = (regions: string): string => {
    return `"${regions.split(';').map(_translate).join(', ')}"`
  }

  const fixed: Record<string, string> = {
    regions: _handleRegions(regions),
    iso3: `"${iso3}"`,
    name: `"${_translate(name)}"`,
    ...row,
  }

  if (year) {
    fixed.year = `"${year.replace('_', '-')}"`
  }

  Object.keys(row).forEach((key) => {
    if (row[key]) {
      fixed[key] = row[key].replace(/"/g, '').replace(/\n/g, '').replace(/\r/g, '')
    }
  })

  return fixed
}

const handleContent = async (content: Array<Record<string, string>>) => {
  const i18n = (await createI18nPromise('en')) as i18nType
  // sort content by country iso and then by year
  content.sort((a, b) => {
    if (a.iso3 < b.iso3) return -1
    if (a.iso3 > b.iso3) return 1
    if (a.year < b.year) return -1
    if (a.year > b.year) return 1
    return 0
  })
  const res = content.map((c) => handleResult(c, i18n))
  return _convertToCSV(res)
}

const _getCountries = async (assessment: Assessment, cycle: Cycle) => {
  const regionGroups = await RegionRepository.getRegionGroups({ assessment, cycle })
  const fraRegions = Object.values(regionGroups).find((rg) => rg.name === RegionGroupName.fra2020)
  const allowedRegions = fraRegions?.regions.map((r) => r.regionCode)
  const allCountries = await CountryRepository.getMany({ assessment, cycle })

  return allCountries.reduce((acc, country) => {
    if (!Areas.isAtlantis(country.countryIso)) {
      const regionCodes = country.regionCodes.filter((r) => allowedRegions.includes(r))
      acc.push({ ...country, regionCodes })
    }
    return acc
  }, [])
}

export const getBulkDownload = async (props: { assessment: Assessment; cycle: Cycle }) => {
  const { assessment, cycle } = props
  const countries = await _getCountries(assessment, cycle)

  const params = { assessment, cycle, countries }

  const annualVariableEntries = await getContentVariables({ ...params, fileName: 'Annual', entries: annualEntries })
  const intervalVariableEntries = await getContentVariables({
    ...params,
    fileName: 'Intervals',
    entries: intervalEntries(cycle),
  })

  const fraYearsVariableEntries = await getContentVariables({
    ...params,
    fileName: 'FRA_Years',
    entries: FRAEntries(cycle),
  })

  const [annual, intervals, fraYears] = await Promise.all([
    getContent({ ...params, entries: annualEntries }),
    getContent({ ...params, entries: intervalEntries(cycle) }),
    getFraYearsData(params),
  ])

  return Promise.all([
    ...annualVariableEntries.map(async (entry) => {
      return {
        fileName: _getFileName(entry.fileName),
        content: handleContent(entry.content),
      }
    }),
    ...intervalVariableEntries.map(async (entry) => {
      return {
        fileName: _getFileName(entry.fileName),
        content: handleContent(entry.content),
      }
    }),
    ...fraYearsVariableEntries.map(async (entry) => {
      return {
        fileName: _getFileName(entry.fileName),
        content: handleContent(entry.content),
      }
    }),

    {
      fileName: _getFileName('Annual'),
      content: handleContent(annual),
    },
    {
      fileName: _getFileName('Intervals'),
      content: handleContent(intervals),
    },
    {
      fileName: _getFileName('FRA_Years'),
      content: handleContent(fraYears),
    },
  ])
}
