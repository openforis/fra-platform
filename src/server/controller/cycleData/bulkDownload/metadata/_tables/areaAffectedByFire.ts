import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class AreaAffectedByFireBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const tableName = TableNames.areaAffectedByFire

    return [
      {
        csvColumn: '5b_fire_land',
        tableName,
        variableName: 'total_land_area_affected_by_fire',
      },
      {
        csvColumn: '5b_fire_forest',
        tableName,
        variableName: 'of_which_on_forest',
      },
    ]
  }
}
