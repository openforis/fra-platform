import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getGrowingStockTotal: BulkDownloadTableFactory = (props): BulkDownloadTable => {
  const { cycle } = props

  return {
    tableName: TableNames.growingStockTotal,
    variables: [
      {
        variableName: 'naturallyRegeneratingForest',
        csvColumn: '2a_gs_tot_nat_reg',
      },
      ...(cycle.name === CycleNames._2020
        ? []
        : [
            {
              variableName: 'primaryForest',
              csvColumn: '2a_gs_total_primary',
            },
            {
              variableName: 'plantationForestIntroducedArea',
              csvColumn: '2a_gs_total_introduced',
            },
          ]),
      {
        variableName: 'plantedForest',
        csvColumn: '2a_gs_tot_planted',
      },
      {
        variableName: 'plantationForest',
        csvColumn: '2a_gs_tot_plantation',
      },
      {
        variableName: 'otherPlantedForest',
        csvColumn: '2a_gs_tot_other_planted',
      },
      {
        variableName: 'forest',
        csvColumn: '2a_gs_tot_forest',
      },
      {
        variableName: 'otherWoodedLand',
        csvColumn: '2a_gs_tot_owl',
      },
    ],
  }
}
