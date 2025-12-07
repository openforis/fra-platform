import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import {
  BulkDownloadColDescription,
  BulkDownloadColNode,
  BulkDownloadColNodeType,
  BulkDownloadRow,
} from 'server/controller/cycleData/getBulkDownload/types'

export const getForestRestoration: BulkDownloadFileFactory = (_props) => {
  const type = BulkDownloadColNodeType.string
  const colNodes: Array<BulkDownloadColNode> = [
    {
      colName: 'answer',
      csvColumn: 'restoration commitments',
      tableName: TableNames.forestRestoration,
      type,
      variableName: 'has_your_country_forest_restoration_commitments',
    },
    {
      colName: 'answer',
      csvColumn: 'Law mandate',
      tableName: TableNames.forestRestoration,
      type,
      variableName: 'law_or_other_mandate',
    },
    {
      colName: 'answer',
      csvColumn: 'National definition',
      tableName: TableNames.forestRestoration,
      type,
      variableName: 'how_monitored',
    },
    {
      colName: 'answer',
      csvColumn: 'areas in need of restoration',
      tableName: TableNames.forestRestoration,
      type,
      variableName: 'areas_in_need_of_restoration',
    },
    {
      colName: 'answer',
      csvColumn: 'restoration targets',
      tableName: TableNames.forestRestoration,
      type,
      variableName: 'restoration_targets',
    },
    {
      colName: 'answer',
      csvColumn: 'ha restored to date',
      tableName: TableNames.forestRestoration,
      type,
      variableName: 'hectares_restored',
    },
  ]

  const comments: BulkDownloadColDescription = {
    csvColumn: 'comments',
    name: CommentableDescriptionName.generalComments,
    sectionName: TableNames.forestRestoration,
  }

  const row: BulkDownloadRow = { colDescriptions: [comments], colNodes }

  return { fileName: 'ForestRestoration', rows: [row] }
}
