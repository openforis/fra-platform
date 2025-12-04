import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getForestCharacteristics: BulkDownloadTableFactory = (props): BulkDownloadTable => {
  const { cycle } = props

  return {
    tableName: TableNames.forestCharacteristics,
    variables: [
      {
        variableName: 'naturalForestArea',
        csvColumn: '1b_naturallyRegeneratingForest',
      },
      ...(cycle.name === CycleNames._2020
        ? []
        : [
            {
              variableName: 'primaryForest',
              csvColumn: '1b_primaryForest',
            },
          ]),
      {
        variableName: 'plantedForest',
        csvColumn: '1b_plantedForest',
      },
      {
        variableName: 'plantationForestArea',
        csvColumn: '1b_plantationForest',
      },
      {
        variableName: 'plantationForestIntroducedArea',
        csvColumn: '1b_plantationForestIntroduced',
      },
      {
        variableName: 'otherPlantedForestArea',
        csvColumn: '1b_otherPlantedForest',
      },
    ],
  }
}
