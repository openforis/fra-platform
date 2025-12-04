import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from './_types'

export const getTotalAreaWithDesignatedManagementObjective: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.totalAreaWithDesignatedManagementObjective,
    variables: [
      {
        variableName: 'production',
        csvColumn: '3a_tot_prod',
      },
      {
        variableName: 'protection_of_soil_and_water',
        csvColumn: '3a_tot_prot',
      },
      {
        variableName: 'conservation_of_biodiversity',
        csvColumn: '3a_tot_biodiv',
      },
      {
        variableName: 'social_services',
        csvColumn: '3a_tot_socserv',
      },
      {
        variableName: 'other',
        csvColumn: '3a_tot_other',
      },
    ],
  }
}
