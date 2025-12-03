import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'

import { BulkDownloadMetadata, PropsBulkDownload } from 'server/controller/cycleData/getBulkDownload/types'
import { getTableData } from 'server/controller/cycleData/getTableData'

type Props = PropsBulkDownload & { countries: Array<Country>; metadata: BulkDownloadMetadata }

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

export const getData = (props: Props): Promise<RecordAssessmentData> => {
  const { assessment, countries, cycle, metadata } = props

  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const tableNames = getTableNames({ metadata })

  return getTableData({ assessment, cycle, countryISOs, tableNames, mergeOdp: true })
}
