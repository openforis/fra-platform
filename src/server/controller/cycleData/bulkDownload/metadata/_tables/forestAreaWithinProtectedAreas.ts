import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class ForestAreaWithinProtectedAreasBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.forestAreaWithinProtectedAreas

    return [
      {
        csvColumn: '3b_protected',
        tableName,
        variableName: 'forest_area_within_protected_areas',
      },
      {
        csvColumn: '3b_forMngt',
        tableName,
        variableName: 'forest_area_with_long_term_management_plan',
      },
      {
        csvColumn: '3b_mngtProt',
        tableName,
        variableName: 'of_which_in_protected_areas',
      },
    ]
  }
}
