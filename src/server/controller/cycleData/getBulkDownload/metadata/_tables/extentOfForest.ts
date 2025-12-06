import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/getBulkDownload/metadata/_tables/_fileYearsBuilder'
import { BulkDownloadTableFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'

export const getExtentOfForest: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.extentOfForest,
    variables: [
      {
        variableName: 'forestArea',
        csvColumn: '1a_forestArea',
      },
      {
        variableName: 'otherWoodedLand',
        csvColumn: '1a_otherWoodedLand',
      },
      {
        variableName: 'totalLandArea',
        csvColumn: '1a_landArea',
      },
    ],
  }
}

export class ExtentOfForestBuilder extends BulkDownloadFileYearsBuilder {
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
