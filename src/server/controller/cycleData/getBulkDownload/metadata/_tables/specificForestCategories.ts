import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getSpecificForestCategories: BulkDownloadTableFactory = (props): BulkDownloadTable => {
  const { cycle } = props

  return {
    tableName: TableNames.specificForestCategories,
    variables: [
      ...(cycle.name === CycleNames._2020
        ? [
            {
              variableName: 'primary_forest',
              csvColumn: '1c_primaryForest',
            },
            {
              variableName: 'temporarily_unstocked',
              csvColumn: '1c_tempUnstocked',
            },
          ]
        : []),
      {
        variableName: 'bamboo',
        csvColumn: '1c_bamboos',
      },
      {
        variableName: 'mangroves',
        csvColumn: '1c_mangroves',
      },
      {
        variableName: 'rubber_wood',
        csvColumn: '1c_rubber',
      },
    ],
  }
}
