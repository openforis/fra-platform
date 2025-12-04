import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getCarbonStockTotal: BulkDownloadTableFactory = (_props): BulkDownloadTable => {
  return {
    tableName: TableNames.carbonStockTotal,
    variables: [
      {
        variableName: 'carbon_forest_above_ground',
        csvColumn: '2d_carbon_agb_total',
      },
      {
        variableName: 'carbon_forest_below_ground',
        csvColumn: '2d_carbon_bgb_total',
      },
      {
        variableName: 'carbon_forest_deadwood',
        csvColumn: '2d_carbon_dw_total',
      },
      {
        variableName: 'carbon_forest_litter',
        csvColumn: '2d_carbon_litter_total',
      },
      {
        variableName: 'carbon_forest_soil',
        csvColumn: '2d_carbon_soil_total',
      },
    ],
  }
}
