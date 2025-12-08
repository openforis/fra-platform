import { Country } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { TableName, TableNames } from 'meta/assessment/table'

import {
  BulkDownloadColType,
  BulkDownloadData,
  BulkDownloadMetadata,
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

  const tableNames = new Set<string>([TableNames.climaticDomain])
  const sectionNames = new Set<string>()

  metadata.files.forEach((file) => {
    const row = file.rows.at(0)
    row.colNodes.forEach((column) => {
      const { colType = BulkDownloadColType.tableNode } = column
      if (colType === BulkDownloadColType.tableNode) {
        tableNames.add(column.tableName)
      }
      if (colType === BulkDownloadColType.description) {
        sectionNames.add(column.tableName)
      }
    })
  })

  return { sectionNames: Array.from(sectionNames), tableNames: Array.from(tableNames) }
}

export const getData = async (props: Props): Promise<BulkDownloadData> => {
  const { assessment, countries, cycle, metadata } = props

  const countryISOs = countries.map<CountryIso>((country) => country.countryIso)
  const { sectionNames, tableNames } = getNames({ metadata })

  const [tables, descriptions, odp] = await Promise.all([
    getTableData({ assessment, countryISOs, cycle, mergeOdp: true, tableNames }),
    DescriptionRepository.getValues({ assessment, countryISOs, cycle, sectionNames }),
    OriginalDataPointRepository.getBulkDownloadData({ assessment, countryISOs, cycle }),
  ])

  return { descriptions, odp, tables }
}
