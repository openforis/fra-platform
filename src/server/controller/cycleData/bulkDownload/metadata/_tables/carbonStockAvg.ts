import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class CarbonStockAvgBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const tableName = cycle.name === CycleNames._2020 ? TableNames.carbonStock : TableNames.carbonStockAvg

    return [
      {
        csvColumn: '2d_carbon_agb',
        tableName,
        variableName: 'carbon_forest_above_ground',
      },
      {
        csvColumn: '2d_carbon_bgb',
        tableName,
        variableName: 'carbon_forest_below_ground',
      },
      {
        csvColumn: '2d_carbon_dw',
        tableName,
        variableName: 'carbon_forest_deadwood',
      },
      {
        csvColumn: '2d_carbon_litter',
        tableName,
        variableName: 'carbon_forest_litter',
      },
      {
        csvColumn: '2d_carbon_soil',
        tableName,
        variableName: 'carbon_forest_soil',
      },
    ]
  }
}
