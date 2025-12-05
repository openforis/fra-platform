import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'

export const getCarbonStockSoilDepth: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.carbonStockSoilDepth,
    variables: [
      {
        colName: 'soil_depth',
        csvColumn: '2d_soil_depth_cm',
        variableName: 'soil_depth',
        colsVariable: [{ colName: 'soil_depth' }],
      },
    ],
  }
}
