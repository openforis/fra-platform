import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class ForestOwnershipBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const tableName = TableNames.forestOwnership

    return [
      {
        csvColumn: '4a_priv_own',
        tableName,
        variableName: 'private_ownership',
      },
      {
        csvColumn: '4a_individ',
        tableName,
        variableName: 'of_which_by_individuals',
      },
      {
        csvColumn: '4a_bus_inst_fo',
        tableName,
        variableName: 'of_which_by_private_businesses',
      },
      {
        csvColumn: '4a_indigenous_fo',
        tableName,
        variableName: 'of_which_by_communities',
      },
      {
        csvColumn: '4a_pub_own',
        tableName,
        variableName: 'public_ownership',
      },
      ...(cycle.name === CycleNames._2020
        ? [
            {
              csvColumn: '4a_fo_unknown',
              tableName,
              variableName: 'other_or_unknown',
            },
          ]
        : [
            {
              csvColumn: '4a_fo_other',
              tableName,
              variableName: 'other',
            },
            {
              csvColumn: '4a_fo_unknown',
              tableName,
              variableName: 'unknown',
            },
          ]),
    ]
  }
}
