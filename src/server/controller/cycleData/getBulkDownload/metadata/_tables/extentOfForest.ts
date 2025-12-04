import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTable } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getExtentOfForest: BulkDownloadTableFactory = (_props): BulkDownloadTable => {
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
