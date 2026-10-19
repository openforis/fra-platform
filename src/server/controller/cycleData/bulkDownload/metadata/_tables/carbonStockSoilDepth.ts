import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class CarbonStockSoilDepthBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.carbonStockSoilDepth
    return [
      {
        colName: 'soil_depth',
        csvColumn: '2d_soil_depth_cm',
        singleFileColumns: [{ colName: 'soil_depth', csvColumn: 'soil_depth' }],
        tableName,
        variableName: 'soil_depth',
      },
    ]
  }

  get unitLabelPath(): Array<string> {
    return ['0', 'cols', '0', 'props', 'labels']
  }
}
