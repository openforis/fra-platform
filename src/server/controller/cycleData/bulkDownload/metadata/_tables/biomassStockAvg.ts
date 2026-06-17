import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class BiomassStockAvgBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const tableName = cycle.name === CycleNames._2020 ? TableNames.biomassStock : TableNames.biomassStockAvg

    return [
      {
        csvColumn: '2c_agb',
        tableName,
        variableName: 'forest_above_ground',
      },
      {
        csvColumn: '2c_bgb',
        tableName,
        variableName: 'forest_below_ground',
      },
      {
        csvColumn: '2c_dwb',
        tableName,
        variableName: 'forest_deadwood',
      },
    ]
  }
}
