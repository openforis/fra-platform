import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { DescriptionCountryValues } from 'meta/assessment/descriptionValue'
import { TableName, TableNames } from 'meta/assessment/table'
import { Objects } from 'utils/objects'

import {
  BulkDownloadColType,
  BulkDownloadData,
  BulkDownloadMetadata,
  BulkDownloadODPDataTableName,
  PropsBulkDownload,
} from 'server/controller/cycleData/getBulkDownload/types'
import { getTableData } from 'server/controller/cycleData/getTableData'
import { DescriptionRepository } from 'server/db/repository/assessmentCycle/descriptions'
import { OriginalDataPointRepository } from 'server/db/repository/assessmentCycle/originalDataPoint'

type Props = PropsBulkDownload & { countries: Array<Country>; metadata: BulkDownloadMetadata }

const getNames = (props: {
  metadata: BulkDownloadMetadata
}): { sectionNames: Array<string>; tableNames: Array<TableName> } => {
  const { metadata } = props

  const tableNames = new Set<string>()
  const sectionNames = new Set<string>()

  metadata.files.forEach((file) => {
    const row = file.rows.at(0)
    row.colNodes.forEach((column) => {
      const { colType = BulkDownloadColType.tableNode } = column
      if (colType === BulkDownloadColType.tableNode) {
        tableNames.add(column.tableName)
      }
    })
    row.colDescriptions?.forEach((description) => {
      sectionNames.add(description.sectionName)
    })
  })

  tableNames.add(TableNames.climaticDomain)

  return { sectionNames: Array.from(sectionNames), tableNames: Array.from(tableNames) }
}

type Returned = [BulkDownloadData, DescriptionCountryValues]

export const getData = async (props: Props): Promise<Returned> => {
  const { assessment, countries, cycle, metadata } = props

  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const { sectionNames, tableNames } = getNames({ metadata })

  const [data, descriptions, odpData] = await Promise.all([
    getTableData({ assessment, countryISOs, cycle, mergeOdp: true, tableNames }),
    DescriptionRepository.getValues({ assessment, countryISOs, cycle, sectionNames }),
    OriginalDataPointRepository.getBulkDownloadData({ assessment, countryISOs, cycle }),
  ])
  Objects.set(data, [BulkDownloadODPDataTableName], odpData)

  return [data as BulkDownloadData, descriptions]
}
