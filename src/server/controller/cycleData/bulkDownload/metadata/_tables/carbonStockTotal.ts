import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class CarbonStockTotalBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.carbonStockTotal

    return [
      {
        csvColumn: '2d_carbon_agb_total',
        tableName,
        variableName: 'carbon_forest_above_ground',
      },
      {
        csvColumn: '2d_carbon_bgb_total',
        tableName,
        variableName: 'carbon_forest_below_ground',
      },
      {
        csvColumn: '2d_carbon_dw_total',
        tableName,
        variableName: 'carbon_forest_deadwood',
      },
      {
        csvColumn: '2d_carbon_litter_total',
        tableName,
        variableName: 'carbon_forest_litter',
      },
      {
        csvColumn: '2d_carbon_soil_total',
        tableName,
        variableName: 'carbon_forest_soil',
      },
    ]
  }
}
