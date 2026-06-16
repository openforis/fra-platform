import { TableNames } from 'meta/assessment/table'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/bulkDownload/metadata/_types'
import {
  BulkDownloadColNode,
  BulkDownloadDatumType,
  BulkDownloadRow,
} from 'server/controller/cycleData/bulkDownload/types'

export const getTierData: BulkDownloadFileFactory = (props) => {
  const { includeClimaticDomain } = props

  const datumType = BulkDownloadDatumType.string
  const colNodes: Array<BulkDownloadColNode> = [
    {
      colName: 'status',
      csvColumn: '1a_status',
      datumType,
      tableName: TableNames.extentOfForest_forestAreaStatusAndTrend,
      variableName: 'status',
    },
    {
      colName: 'trend',
      csvColumn: '1a_trend',
      datumType,
      tableName: TableNames.extentOfForest_forestAreaStatusAndTrend,
      variableName: 'trend',
    },
    {
      colName: 'status',
      csvColumn: '2a_status',
      datumType,
      tableName: TableNames.growingStock_growingStockStatus,
      variableName: 'status',
    },
    {
      colName: 'status',
      csvColumn: '2c_status',
      datumType,
      tableName: TableNames.biomassStock_biomassStockStatus,
      variableName: 'status',
    },
  ]

  const row: BulkDownloadRow = { colNodes }

  return { fileName: 'Tiers', includeClimaticDomain, includeDeskStudy: true, rows: [row] }
}
