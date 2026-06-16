import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class GrowingStockTotalBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const tableName = TableNames.growingStockTotal

    return [
      {
        csvColumn: '2a_gs_tot_nat_reg',
        tableName,
        variableName: 'naturallyRegeneratingForest',
      },
      ...(cycle.name === CycleNames._2020
        ? []
        : [
            {
              csvColumn: '2a_gs_total_primary',
              tableName,
              variableName: 'primaryForest',
            },
            {
              csvColumn: '2a_gs_total_introduced',
              tableName,
              variableName: 'plantationForestIntroducedArea',
            },
          ]),
      {
        csvColumn: '2a_gs_tot_planted',
        tableName,
        variableName: 'plantedForest',
      },
      {
        csvColumn: '2a_gs_tot_plantation',
        tableName,
        variableName: 'plantationForest',
      },
      {
        csvColumn: '2a_gs_tot_other_planted',
        tableName,
        variableName: 'otherPlantedForest',
      },
      {
        csvColumn: '2a_gs_tot_forest',
        tableName,
        variableName: 'forest',
      },
      {
        csvColumn: '2a_gs_tot_owl',
        tableName,
        variableName: 'otherWoodedLand',
      },
    ]
  }
}
