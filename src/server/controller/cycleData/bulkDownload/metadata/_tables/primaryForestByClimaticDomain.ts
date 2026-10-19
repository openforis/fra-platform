import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class PrimaryForestByClimaticDomainBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.primaryForestByClimaticDomain

    return [
      {
        csvColumn: '1b_primaryForestBoreal',
        tableName,
        variableName: 'primaryForestBoreal',
      },
      {
        csvColumn: '1b_primaryForestTemperate',
        tableName,
        variableName: 'primaryForestTemperate',
      },
      {
        csvColumn: '1b_primaryForestSubTropical',
        tableName,
        variableName: 'primaryForestSubTropical',
      },
      {
        csvColumn: '1b_primaryForestTropical',
        tableName,
        variableName: 'primaryForestTropical',
      },
    ]
  }
}
