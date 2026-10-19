import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class AnnualReforestationBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.annualReforestation

    return [
      {
        tableName,
        csvColumn: '1d_reforestation',
        variableName: 'reforestation',
      },
    ]
  }
}
