import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from './_types'

export const getBiomassStockAvg: BulkDownloadTableFactory = (props) => {
  const { cycle } = props

  const tableName = cycle.name === CycleNames._2020 ? TableNames.biomassStock : TableNames.biomassStockAvg

  return {
    tableName,
    variables: [
      {
        variableName: 'forest_above_ground',
        csvColumn: '2c_agb',
      },
      {
        variableName: 'forest_below_ground',
        csvColumn: '2c_bgb',
      },
      {
        variableName: 'forest_deadwood',
        csvColumn: '2c_dwb',
      },
    ],
  }
}
