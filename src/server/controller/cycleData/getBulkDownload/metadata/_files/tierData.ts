import { TableNames } from 'meta/assessment/table'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import {
  BulkDownloadColNode,
  BulkDownloadColNodeType,
  BulkDownloadRow,
} from 'server/controller/cycleData/getBulkDownload/types'

export const getTierData: BulkDownloadFileFactory = (_props) => {
  const type = BulkDownloadColNodeType.string
  const colNodes: Array<BulkDownloadColNode> = [
    {
      colName: 'status',
      csvColumn: '1a_status',
      tableName: TableNames.extentOfForest_forestAreaStatusAndTrend,
      type,
      variableName: 'status',
    },
    {
      colName: 'trend',
      csvColumn: '1a_trend',
      tableName: TableNames.extentOfForest_forestAreaStatusAndTrend,
      type,
      variableName: 'trend',
    },
    {
      colName: 'status',
      csvColumn: '2a_status',
      tableName: TableNames.growingStock_growingStockStatus,
      type,
      variableName: 'status',
    },
    {
      colName: 'status',
      csvColumn: '2c_status',
      tableName: TableNames.biomassStock_biomassStockStatus,
      type,
      variableName: 'status',
    },
  ]

  const row: BulkDownloadRow = { colNodes }

  return { fileName: 'Tiers', includeClimaticDomain: true, rows: [row] }
}
