import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class SpecificForestCategoriesBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const tableName = TableNames.specificForestCategories

    return [
      ...(cycle.name === CycleNames._2020
        ? [
            {
              csvColumn: '1c_primaryForest',
              tableName,
              variableName: 'primary_forest',
            },
            {
              csvColumn: '1c_tempUnstocked',
              tableName,
              variableName: 'temporarily_unstocked',
            },
          ]
        : []),
      {
        csvColumn: '1c_bamboos',
        tableName,
        variableName: 'bamboo',
      },
      {
        csvColumn: '1c_mangroves',
        tableName,
        variableName: 'mangroves',
      },
      {
        csvColumn: '1c_rubber',
        tableName,
        variableName: 'rubber_wood',
      },
    ]
  }
}
