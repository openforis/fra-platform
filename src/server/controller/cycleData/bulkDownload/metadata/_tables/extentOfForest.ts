import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class ExtentOfForestBuilder extends BulkDownloadFileYearsBuilder {
  get includeClimaticDomainSingleFiles(): boolean {
    return true
  }

  getBaseColNodes(): Array<ColNodeYearsFactory> {
    return [
      {
        csvColumn: '1a_forestArea',
        tableName: TableNames.extentOfForest,
        variableName: 'forestArea',
      },
      {
        csvColumn: '1a_otherWoodedLand',
        tableName: TableNames.extentOfForest,
        variableName: 'otherWoodedLand',
      },
      {
        csvColumn: '1a_landArea',
        tableName: TableNames.extentOfForest,
        variableName: 'totalLandArea',
      },
    ]
  }
}
