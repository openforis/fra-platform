import { createI18nPromise } from 'i18n/i18nFactory'
import { i18n as i18nType } from 'i18next'

import { CountryIso } from 'meta/area/countryIso'
import { TableName, TableNames } from 'meta/assessment/table'
import { Lang } from 'meta/lang'

import { getCSVContentVariables } from 'server/controller/cycleData/getBulkDownload/csvContent/getCSVContentVariables'
import { getCountries } from 'server/controller/cycleData/getBulkDownload/getCountries'
import { getBulkDownloadMetadata } from 'server/controller/cycleData/getBulkDownload/metadata/getBulkDownloadMetadata'
import { BulkDownloadMetadata, CSVContent, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'
import { getTableData } from 'server/controller/cycleData/getTableData'

const getTableNames = (props: { metadata: BulkDownloadMetadata }): Array<TableName> => {
  const { metadata } = props

  const tableNames = metadata.years.flatMap((year) => {
    return year.tables.flatMap((table) => {
      return table.tableName
    })
  })

  tableNames.push(TableNames.climaticDomain)

  return tableNames
}

// includeClimaticDomain will be dynamically handled in a separate task
type Props = PropsBulkDownload & { includeClimaticDomain?: boolean }

export const getBulkDownload = async (props: Props): Promise<Array<CSVContent>> => {
  const { assessment, cycle, includeClimaticDomain = true } = props

  const metadata = getBulkDownloadMetadata({ assessment, cycle })
  const tableNames = getTableNames({ metadata })

  const i18n = (await createI18nPromise(Lang.en)) as i18nType
  const countries = await getCountries({ assessment, cycle })
  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const data = await getTableData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true })

  const csvEntries: Array<CSVContent> = []
  const propsContent = { assessment, countries, cycle, data, i18n, includeClimaticDomain }

  // years csv files
  await Promise.all(
    metadata.years.map(async (yearMeta) => {
      const csvEntry = await getCSVContentVariables({ ...propsContent, yearMeta })
      csvEntries.push(csvEntry)
    })
  )

  return csvEntries
}
