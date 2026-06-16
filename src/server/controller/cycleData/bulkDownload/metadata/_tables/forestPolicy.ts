import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'
import { BulkDownloadDatumType } from 'server/controller/cycleData/bulkDownload/types'

export class ForestPolicyBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.forestPolicy
    const datumType = BulkDownloadDatumType.string

    return [
      {
        colName: 'national_yes_no',
        csvColumn: '6a_policies_national',
        datumType,
        singleFileColumns: [{ colName: 'national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        variableName: 'policies_supporting_SFM',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_policies_sub_national',
        datumType,
        singleFileColumns: [{ colName: 'sub_national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        variableName: 'policies_supporting_SFM',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_legislation_national',
        datumType,
        singleFileColumns: [{ colName: 'national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        variableName: 'legislations_supporting_SFM',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_legislation_sub_national',
        datumType,
        singleFileColumns: [{ colName: 'sub_national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        variableName: 'legislations_supporting_SFM',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_platform_national',
        datumType,
        singleFileColumns: [{ colName: 'national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        variableName: 'platform_for_stakeholder_participation',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_platform_sub_national',
        datumType,
        singleFileColumns: [{ colName: 'sub_national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        variableName: 'platform_for_stakeholder_participation',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_traceability_national',
        datumType,
        singleFileColumns: [{ colName: 'national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        variableName: 'existence_of_traceability_system',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_traceability_sub_national',
        datumType,
        singleFileColumns: [{ colName: 'sub_national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        variableName: 'existence_of_traceability_system',
      },
    ]
  }
}
