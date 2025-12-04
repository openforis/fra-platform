import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getBiomassStockTotal: BulkDownloadTableFactory = (_props): BulkDownloadTable => {
  return {
    tableName: TableNames.biomassStockTotal,
    variables: [
      {
        variableName: 'forest_above_ground',
        csvColumn: '2c_agb_total',
      },
      {
        variableName: 'forest_below_ground',
        csvColumn: '2c_bgb_total',
      },
      {
        variableName: 'forest_deadwood',
        csvColumn: '2c_dwb_total',
      },
    ],
  }
}
