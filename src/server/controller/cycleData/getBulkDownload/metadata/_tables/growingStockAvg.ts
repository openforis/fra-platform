import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'

export const getGrowingStockAvg: BulkDownloadTableFactory = (props) => {
  const { cycle } = props

  return {
    tableName: TableNames.growingStockAvg,
    variables: [
      {
        variableName: 'naturallyRegeneratingForest',
        csvColumn: '2a_gs_ha_nat_reg',
      },
      ...(cycle.name === CycleNames._2020
        ? []
        : [
            {
              variableName: 'primaryForest',
              csvColumn: '2a_gs_ha_primary',
            },
            {
              variableName: 'plantationForestIntroducedArea',
              csvColumn: '2a_gs_ha_introduced',
            },
          ]),
      {
        variableName: 'forest',
        csvColumn: '2a_gs_ha_forest',
      },
      {
        variableName: 'plantationForest',
        csvColumn: '2a_gs_ha_plantation',
      },
      {
        variableName: 'plantedForest',
        csvColumn: '2a_gs_ha_planted',
      },
      {
        variableName: 'otherWoodedLand',
        csvColumn: '2a_gs_ha_owl',
      },
      {
        variableName: 'otherPlantedForest',
        csvColumn: '2a_gs_ha_other_planted',
      },
    ],
  }
}
