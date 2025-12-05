import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'

import { BulkDownloadMetadata, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'
import { getTableData } from 'server/controller/cycleData/getTableData'

type Props = PropsBulkDownload & { countries: Array<Country>; metadata: BulkDownloadMetadata }

const getTableNames = (props: { metadata: BulkDownloadMetadata }): Array<TableName> => {
  const { metadata } = props

  const tableNames = new Set<string>()

  metadata.years.forEach((year) => {
    return year.tables.forEach((table) => {
      tableNames.add(table.tableName)
    })
  })

  metadata.files.forEach((file) => {
    file.columns.forEach((column) => {
      tableNames.add(column.tableName)
    })
  })

  tableNames.add(TableNames.climaticDomain)

  return Array.from(tableNames)
}

export const getData = (props: Props): Promise<RecordAssessmentData> => {
  const { assessment, countries, cycle, metadata } = props

  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const tableNames = getTableNames({ metadata })

  return getTableData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true })
}
