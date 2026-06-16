import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class ForestCharacteristicsBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const tableName = TableNames.forestCharacteristics

    return [
      {
        csvColumn: '1b_naturallyRegeneratingForest',
        tableName,
        variableName: 'naturalForestArea',
      },
      ...(cycle.name === CycleNames._2020
        ? []
        : [
            {
              csvColumn: '1b_primary',
              tableName,
              variableName: 'primaryForest',
            },
          ]),
      {
        csvColumn: '1b_plantedForest',
        tableName,
        variableName: 'plantedForest',
      },
      {
        csvColumn: '1b_plantationForest',
        tableName,
        variableName: 'plantationForestArea',
      },
      {
        csvColumn: '1b_plantationForestIntroduced',
        tableName,
        variableName: 'plantationForestIntroducedArea',
      },
      {
        csvColumn: '1b_otherPlantedForest',
        tableName,
        variableName: 'otherPlantedForestArea',
      },
    ]
  }
}
