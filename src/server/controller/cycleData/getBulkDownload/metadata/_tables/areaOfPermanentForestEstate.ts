import { TableNames } from 'meta/assessment/table'

import { BulkDownloadVariableType } from 'server/controller/cycleData/getBulkDownload/types'

import { BulkDownloadTableFactory } from './_types'

export const getAreaOfPermanentForestEstate: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.areaOfPermanentForestEstate,
    variables: [
      {
        colName: 'applicable',
        csvColumn: '6b_pfe_y_n',
        type: BulkDownloadVariableType.string,
        variableName: 'area_of_permanent_forest_estate',
        colsVariable: [{ colName: 'applicable' }],
      },
      {
        csvColumn: '6b_pfe_area',
        variableName: 'area_of_permanent_forest_estate',
      },
    ],
  }
}
