import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from './_types'

export const getAreaAffectedByFire: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.areaAffectedByFire,
    variables: [
      {
        csvColumn: '5b_fire_land',
        variableName: 'total_land_area_affected_by_fire',
      },
      {
        csvColumn: '5b_fire_forest',
        variableName: 'of_which_on_forest',
      },
    ],
  }
}
