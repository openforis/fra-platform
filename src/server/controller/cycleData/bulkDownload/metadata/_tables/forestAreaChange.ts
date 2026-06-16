import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class ForestAreaChangeBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.forestAreaChange

    return [
      {
        csvColumn: '1d_expansion',
        tableName,
        variableName: 'forest_expansion',
      },
      {
        csvColumn: '1d_afforestation',
        tableName,
        variableName: 'afforestation',
      },
      {
        csvColumn: '1d_nat_exp',
        tableName,
        variableName: 'natural_expansion',
      },
      {
        csvColumn: '1d_deforestation',
        tableName,
        variableName: 'deforestation',
      },
    ]
  }
}
