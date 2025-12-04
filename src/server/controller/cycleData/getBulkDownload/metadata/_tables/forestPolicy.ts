import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable, BulkDownloadVariableType } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getForestPolicy: BulkDownloadTableFactory = (_props): BulkDownloadTable => {
  const type = BulkDownloadVariableType.string

  return {
    tableName: TableNames.forestPolicy,
    variables: [
      {
        colName: 'national_yes_no',
        csvColumn: '6a_policies_national',
        type,
        variableName: 'policies_supporting_SFM',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_policies_sub_national',
        type,
        variableName: 'policies_supporting_SFM',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_legislation_national',
        type,
        variableName: 'legislations_supporting_SFM',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_legislation_sub_national',
        type,
        variableName: 'legislations_supporting_SFM',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_platform_national',
        type,
        variableName: 'platform_for_stakeholder_participation',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_platform_sub_national',
        type,
        variableName: 'platform_for_stakeholder_participation',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_traceability_national',
        type,
        variableName: 'existence_of_traceability_system',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_traceability_sub_national',
        type,
        variableName: 'existence_of_traceability_system',
      },
    ],
  }
}
