import { createI18nPromise } from '@i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'

import { Areas, CountryIso, RegionCode } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

import { getAnnualData } from '@server/controller/cycleData/getBulkDownload/getAnnualData'
import { getFraYearsData } from '@server/controller/cycleData/getBulkDownload/getFRAYearsData'
import { getIntervalsData } from '@server/controller/cycleData/getBulkDownload/getIntervalsData'
import { CountryRepository } from '@server/repository/assessmentCycle/country'

const _convertToCSV = (arr: Array<Record<string, string>>): string =>
  [Object.keys(arr[0]), ...arr].map((it) => Object.values(it).toString()).join('\n')

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

  return {
    regions: _handleRegions(regions),
    iso3: `"${iso3}"`,
    name: `"${_translate(name)}"`,
    year: `"${year.replace('_', '-')}"`,
    ...row,
  }
}

const handleContent = async (content: Array<Record<string, string>>) => {
  const i18n = (await createI18nPromise('en')) as i18nType
  const res = content.map((c) => handleResult(c, i18n))
  return _convertToCSV(res)
}

export const getBulkDownload = async (props: { assessment: Assessment; cycle: Cycle }) => {
  const { assessment, cycle } = props
  const countries = await CountryRepository.getMany({ assessment, cycle })
  const annual = await getAnnualData({ assessment, cycle, countries })
  const intervals = await getIntervalsData({ assessment, cycle, countries })
  const fraYears = await getFraYearsData({ assessment, cycle, countries })
  return [
    {
      fileName: _getFileName('Annual'),
      content: await handleContent(annual),
    },
    {
      fileName: _getFileName('Intervals'),
      content: await handleContent(intervals),
    },
    {
      fileName: _getFileName('FRA_Years'),
      content: await handleContent(fraYears),
    },
  ]
}
