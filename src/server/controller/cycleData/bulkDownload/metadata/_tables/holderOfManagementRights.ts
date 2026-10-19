import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class HolderOfManagementRightsBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const is2020 = cycle.name === CycleNames._2020
    const tableName = TableNames.holderOfManagementRights

    return [
      {
        csvColumn: '4b_pub_admin',
        tableName,
        variableName: 'public_administration',
      },
      ...[
        ...(is2020
          ? [
              {
                csvColumn: '4b_individuals',
                tableName,
                variableName: 'individuals',
              },
            ]
          : []),
      ],
      {
        csvColumn: '4b_bus_inst_mr',
        tableName,
        variableName: 'private_businesses',
      },
      {
        csvColumn: '4b_indigenous_mr',
        tableName,
        variableName: 'communities',
      },
      {
        csvColumn: '4b_unknown',
        tableName,
        variableName: is2020 ? 'other' : 'unknown',
      },
      ...[
        ...(is2020
          ? []
          : [
              {
                csvColumn: '4b_other',
                tableName,
                variableName: 'other2025',
              },
            ]),
      ],
    ]
  }
}
