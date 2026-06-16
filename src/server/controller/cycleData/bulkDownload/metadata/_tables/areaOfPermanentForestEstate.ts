import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'
import { BulkDownloadDatumType } from 'server/controller/cycleData/bulkDownload/types'

export class AreaOfPermanentForestEstateBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const applicable = 'applicable'
    const tableName = TableNames.areaOfPermanentForestEstate

    return [
      {
        colName: applicable,
        csvColumn: '6b_pfe_y_n',
        datumType: BulkDownloadDatumType.string,
        singleFileColumns: [{ colName: applicable, csvColumn: applicable }],
        tableName,
        variableName: 'area_of_permanent_forest_estate',
      },
      {
        csvColumn: '6b_pfe_area',
        tableName,
        variableName: 'area_of_permanent_forest_estate',
      },
    ]
  }
}
