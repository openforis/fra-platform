import { createI18nPromise } from '@i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'

import { Areas, CountryIso, RegionCode } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'

import { DataRepository } from '@server/repository/assessmentCycle/data'

// Convert input array to CSV format as string
const _convertToCSV = (arr: Array<Record<string, string>>): string =>
  [Object.keys(arr[0]), ...arr].map((it) => Object.values(it).toString()).join('\n')

// Get csv file name with timestamp
const _getFileName = (name: string): string => {
  const date = new Date()
  const timestamp = `${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}`
  return `${name}_${timestamp}.csv`
}

// eslint-disable-next-line camelcase
const handleResult = ({ regions, country_iso, ...row }: Record<string, string>, i18n: i18nType) => {
  const _translate = (key: string) => i18n.t<string>(Areas.getTranslationKey(key as RegionCode | CountryIso))

  const _handleRegions = (regions: string): string => {
    return `"${regions.split(';').map(_translate).join(', ')}"`
  }

  return {
    regions: _handleRegions(regions),
    // eslint-disable-next-line camelcase
    iso3: country_iso,
    name: _translate(country_iso),
    ...row,
  }
}

const handleContent = async (content: Array<Record<string, string>>) => {
  const i18n = (await createI18nPromise('en')) as i18nType
  const res = content.map((c) => handleResult(c, i18n))
  return _convertToCSV(res)
}

const contentMap = {
  FRA_Years: DataRepository.BulkDownload.getFraYearsData,
  Interval: DataRepository.BulkDownload.getIntervalData,
  Annual: DataRepository.BulkDownload.getAnnualData,
}

export const getBulkDownload = (props: { assessment: Assessment; cycle: Cycle }) => {
  const promises = Object.entries(contentMap).map(async ([name, f]) => {
    const content = await f(props)

    return {
      fileName: _getFileName(name),
      content: await handleContent(content),
    }
  })
  return Promise.all(promises)
}
