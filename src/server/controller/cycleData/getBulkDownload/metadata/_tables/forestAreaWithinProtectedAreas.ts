import { TableNames } from 'meta/assessment/table'

import { BulkDownloadTableFactory } from './_types'

export const getForestAreaWithinProtectedAreas: BulkDownloadTableFactory = (_props) => {
  return {
    tableName: TableNames.forestAreaWithinProtectedAreas,
    variables: [
      {
        variableName: 'forest_area_within_protected_areas',
        csvColumn: '3b_protected',
      },
      {
        variableName: 'forest_area_with_long_term_management_plan',
        csvColumn: '3b_forMngt',
      },
      {
        variableName: 'of_which_in_protected_areas',
        csvColumn: '3b_mngtProt',
      },
    ],
  }
}
