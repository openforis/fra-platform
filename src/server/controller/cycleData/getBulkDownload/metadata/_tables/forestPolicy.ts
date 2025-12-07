import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/getBulkDownload/metadata/_tables/_fileYearsBuilder'
import { BulkDownloadColNodeType } from 'server/controller/cycleData/getBulkDownload/types'

export class ForestPolicyBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.forestPolicy
    const type = BulkDownloadColNodeType.string

    return [
      {
        colName: 'national_yes_no',
        csvColumn: '6a_policies_national',
        singleFileColumns: [{ colName: 'national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        type,
        variableName: 'policies_supporting_SFM',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_policies_sub_national',
        singleFileColumns: [{ colName: 'sub_national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        type,
        variableName: 'policies_supporting_SFM',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_legislation_national',
        singleFileColumns: [{ colName: 'national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        type,
        variableName: 'legislations_supporting_SFM',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_legislation_sub_national',
        singleFileColumns: [{ colName: 'sub_national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        type,
        variableName: 'legislations_supporting_SFM',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_platform_national',
        singleFileColumns: [{ colName: 'national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        type,
        variableName: 'platform_for_stakeholder_participation',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_platform_sub_national',
        singleFileColumns: [{ colName: 'sub_national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        type,
        variableName: 'platform_for_stakeholder_participation',
      },
      {
        colName: 'national_yes_no',
        csvColumn: '6a_traceability_national',
        singleFileColumns: [{ colName: 'national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        type,
        variableName: 'existence_of_traceability_system',
      },
      {
        colName: 'sub_national_yes_no',
        csvColumn: '6a_traceability_sub_national',
        singleFileColumns: [{ colName: 'sub_national_yes_no', csvColumn: 'yes_no' }],
        tableName,
        type,
        variableName: 'existence_of_traceability_system',
      },
    ]
  }
}
