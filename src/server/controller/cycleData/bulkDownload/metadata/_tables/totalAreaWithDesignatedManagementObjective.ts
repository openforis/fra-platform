import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class TotalAreaWithDesignatedManagementObjectiveBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.totalAreaWithDesignatedManagementObjective

    return [
      {
        csvColumn: '3a_tot_prod',
        tableName,
        variableName: 'production',
      },
      {
        csvColumn: '3a_tot_prot',
        tableName,
        variableName: 'protection_of_soil_and_water',
      },
      {
        csvColumn: '3a_tot_biodiv',
        tableName,
        variableName: 'conservation_of_biodiversity',
      },
      {
        csvColumn: '3a_tot_socserv',
        tableName,
        variableName: 'social_services',
      },
      {
        csvColumn: '3a_tot_other',
        tableName,
        variableName: 'other',
      },
    ]
  }
}
