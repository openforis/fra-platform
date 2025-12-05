import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'

export const getHolderOfManagementRights: BulkDownloadTableFactory = (props) => {
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
