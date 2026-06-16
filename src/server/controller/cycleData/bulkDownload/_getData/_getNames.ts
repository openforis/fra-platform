import { TableName, TableNames } from 'meta/assessment/table'

import { BulkDownloadColType, BulkDownloadMetadata } from 'server/controller/cycleData/bulkDownload/types'

type Props = {
  metadata: BulkDownloadMetadata
}

type Returned = { sectionNames: Array<string>; tableNames: Array<TableName> }

export const _getNames = (props: Props): Returned => {
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
