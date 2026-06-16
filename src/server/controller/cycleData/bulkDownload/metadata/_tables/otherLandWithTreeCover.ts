import { CycleNames } from 'meta/assessment/cycle/names'
import { TableNames } from 'meta/assessment/table'

import {
  BulkDownloadFileYearsBuilder,
  ColNodeYearsFactory,
} from 'server/controller/cycleData/bulkDownload/metadata/_tables/_fileYearsBuilder'

export class OtherLandWithTreeCoverBuilder extends BulkDownloadFileYearsBuilder {
  getBaseColNodes(): Array<ColNodeYearsFactory> {
    const { cycle } = this.props
    const anchor = cycle.name === CycleNames._2020 ? '1f' : '1e'
    const tableName = TableNames.otherLandWithTreeCover

    return [
      {
        csvColumn: `${anchor}_palms`,
        tableName,
        variableName: 'palms',
      },
      {
        csvColumn: `${anchor}_treeOrchards`,
        tableName,
        variableName: 'tree_orchards',
      },
      {
        csvColumn: `${anchor}_agroforestry`,
        tableName,
        variableName: 'agroforestry',
      },
      {
        csvColumn: `${anchor}_treesUrbanSettings`,
        tableName,
        variableName: 'trees_in_urban_settings',
      },
      {
        csvColumn: `${anchor}_other`,
        tableName,
        variableName: 'other',
      },
    ]
  }
}
