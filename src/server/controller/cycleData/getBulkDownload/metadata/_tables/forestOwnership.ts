import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'

export const getForestOwnership: BulkDownloadTableFactory = (props) => {
  const { cycle } = props

  return {
    tableName: TableNames.forestOwnership,
    variables: [
      {
        variableName: 'private_ownership',
        csvColumn: '4a_priv_own',
      },
      {
        variableName: 'of_which_by_individuals',
        csvColumn: '4a_individ',
      },
      {
        variableName: 'of_which_by_private_businesses',
        csvColumn: '4a_bus_inst_fo',
      },
      {
        variableName: 'of_which_by_communities',
        csvColumn: '4a_indigenous_fo',
      },
      {
        variableName: 'public_ownership',
        csvColumn: '4a_pub_own',
      },
      ...(cycle.name === CycleNames._2020
        ? [
            {
              variableName: 'other_or_unknown',
              csvColumn: '4a_fo_unknown',
            },
          ]
        : [
            {
              variableName: 'other',
              csvColumn: '4a_fo_other',
            },
            {
              variableName: 'unknown',
              csvColumn: '4a_fo_unknown',
            },
          ]),
    ],
  }
}
