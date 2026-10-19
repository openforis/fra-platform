import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class BiomassStockTotalBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.biomassStockTotal

    return [
      {
        csvColumn: '2c_agb_total',
        tableName,
        variableName: 'forest_above_ground',
      },
      {
        csvColumn: '2c_bgb_total',
        tableName,
        variableName: 'forest_below_ground',
      },
      {
        csvColumn: '2c_dwb_total',
        tableName,
        variableName: 'forest_deadwood',
      },
    ]
  }
}
