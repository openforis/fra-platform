import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class PrimaryDesignatedManagementObjectiveBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const tableName = TableNames.primaryDesignatedManagementObjective

    return [
      {
        csvColumn: '3a_prim_prod',
        tableName,
        variableName: 'production',
      },
      {
        csvColumn: '3a_prim_prot',
        tableName,
        variableName: 'protection_of_soil_and_water',
      },
      {
        csvColumn: '3a_prim_biodiv',
        tableName,
        variableName: 'conservation_of_biodiversity',
      },
      {
        csvColumn: '3a_prim_socserv',
        tableName,
        variableName: 'social_services',
      },
      {
        csvColumn: '3a_prim_multi',
        tableName,
        variableName: 'multiple_use',
      },
      {
        csvColumn: '3a_prim_other',
        tableName,
        variableName: 'other',
      },
      ...(cycle.name === CycleNames._2020
        ? [
            {
              csvColumn: '3a_prim_no_unknown',
              tableName,
              variableName: 'no_unknown',
            },
          ]
        : [
            {
              csvColumn: '3a_prim_no',
              tableName,
              variableName: 'no_designation',
            },
            {
              csvColumn: '3a_prim_unknown',
              tableName,
              variableName: 'unknown',
            },
          ]),
    ]
  }
}
