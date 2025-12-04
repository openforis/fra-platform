import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getCarbonStockAvg: BulkDownloadTableFactory = (props): BulkDownloadTable => {
  const { cycle } = props

  const tableName = cycle.name === CycleNames._2020 ? TableNames.carbonStock : TableNames.carbonStockAvg

  return {
    tableName,
    variables: [
      {
        variableName: 'carbon_forest_above_ground',
        csvColumn: '2d_carbon_agb',
      },
      {
        variableName: 'carbon_forest_below_ground',
        csvColumn: '2d_carbon_bgb',
      },
      {
        variableName: 'carbon_forest_deadwood',
        csvColumn: '2d_carbon_dw',
      },
      {
        variableName: 'carbon_forest_litter',
        csvColumn: '2d_carbon_litter',
      },
      {
        variableName: 'carbon_forest_soil',
        csvColumn: '2d_carbon_soil',
      },
    ],
  }
}
