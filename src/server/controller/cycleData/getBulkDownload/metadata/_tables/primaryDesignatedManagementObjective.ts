import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'

export const getPrimaryDesignatedManagementObjective: BulkDownloadTableFactory = (props) => {
  const { cycle } = props

  return {
    tableName: TableNames.primaryDesignatedManagementObjective,
    variables: [
      {
        variableName: 'production',
        csvColumn: '3a_prim_prod',
      },
      {
        variableName: 'protection_of_soil_and_water',
        csvColumn: '3a_prim_prot',
      },
      {
        variableName: 'conservation_of_biodiversity',
        csvColumn: '3a_prim_biodiv',
      },
      {
        variableName: 'social_services',
        csvColumn: '3a_prim_socserv',
      },
      {
        variableName: 'multiple_use',
        csvColumn: '3a_prim_multi',
      },
      {
        variableName: 'other',
        csvColumn: '3a_prim_other',
      },
      ...(cycle.name === CycleNames._2020
        ? [
            {
              variableName: 'no_unknown',
              csvColumn: '3a_prim_no_unknown',
            },
          ]
        : [
            {
              variableName: 'no_designation',
              csvColumn: '3a_prim_no',
            },
            {
              variableName: 'unknown',
              csvColumn: '3a_prim_unknown',
            },
          ]),
    ],
  }
}
