import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getHolderOfManagementRights: BulkDownloadTableFactory = (props): BulkDownloadTable => {
  const { cycle } = props

  return {
    tableName: TableNames.holderOfManagementRights,
    variables: [
      {
        variableName: 'public_administration',
        csvColumn: '4b_pub_admin',
      },
      ...[
        ...(cycle.name === CycleNames._2020
          ? [
              {
                variableName: 'individuals',
                csvColumn: '4b_individuals',
              },
            ]
          : []),
      ],
      {
        variableName: 'private_businesses',
        csvColumn: '4b_bus_inst_mr',
      },
      {
        variableName: 'communities',
        csvColumn: '4b_indigenous_mr',
      },
      {
        variableName: cycle.name === '2020 ' ? 'other' : 'unknown',
        csvColumn: '4b_unknown',
      },
      ...[
        ...(cycle.name === CycleNames._2020
          ? []
          : [
              {
                variableName: 'other2025',
                csvColumn: '4b_other',
              },
            ]),
      ],
    ],
  }
}
