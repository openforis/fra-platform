import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getCarbonStockSoilDepth: BulkDownloadTableFactory = (_props): BulkDownloadTable => {
  return {
    tableName: TableNames.carbonStockSoilDepth,
    variables: [
      {
        colName: 'soil_depth',
        csvColumn: '2d_soil_depth_cm',
        variableName: 'soil_depth',
      },
    ],
  }
}
