import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class GrowingStockAvgBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const tableName = TableNames.growingStockAvg

    return [
      {
        csvColumn: '2a_gs_ha_nat_reg',
        tableName,
        variableName: 'naturallyRegeneratingForest',
      },
      ...(cycle.name === CycleNames._2020
        ? []
        : [
            {
              csvColumn: '2a_gs_ha_primary',
              tableName,
              variableName: 'primaryForest',
            },
            {
              csvColumn: '2a_gs_ha_introduced',
              tableName,
              variableName: 'plantationForestIntroducedArea',
            },
          ]),
      {
        csvColumn: '2a_gs_ha_forest',
        tableName,
        variableName: 'forest',
      },
      {
        csvColumn: '2a_gs_ha_plantation',
        tableName,
        variableName: 'plantationForest',
      },
      {
        csvColumn: '2a_gs_ha_planted',
        tableName,
        variableName: 'plantedForest',
      },
      {
        csvColumn: '2a_gs_ha_owl',
        tableName,
        variableName: 'otherWoodedLand',
      },
      {
        csvColumn: '2a_gs_ha_other_planted',
        tableName,
        variableName: 'otherPlantedForest',
      },
    ]
  }
}
