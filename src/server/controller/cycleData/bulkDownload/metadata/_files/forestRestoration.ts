import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { TableNames } from 'meta/assessment/table'

import { BulkDownloadFileFactory } from 'server/controller/cycleData/bulkDownload/metadata/_types'
import {
  BulkDownloadColNode,
  BulkDownloadColType,
  BulkDownloadDatumType,
  BulkDownloadRow,
} from 'server/controller/cycleData/bulkDownload/types'

export const getForestRestoration: BulkDownloadFileFactory = (_props) => {
  const datumType = BulkDownloadDatumType.string
  const colNodes: Array<BulkDownloadColNode> = [
    {
      colName: 'answer',
      csvColumn: 'restoration commitments',
      datumType,
      tableName: TableNames.forestRestoration,
      variableName: 'has_your_country_forest_restoration_commitments',
    },
    {
      colName: 'answer',
      csvColumn: 'Law mandate',
      datumType,
      tableName: TableNames.forestRestoration,
      variableName: 'law_or_other_mandate',
    },
    {
      colName: 'answer',
      csvColumn: 'National definition',
      datumType,
      tableName: TableNames.forestRestoration,
      variableName: 'how_monitored',
    },
    {
      colName: 'answer',
      csvColumn: 'areas in need of restoration',
      datumType,
      tableName: TableNames.forestRestoration,
      variableName: 'areas_in_need_of_restoration',
    },
    {
      colName: 'answer',
      csvColumn: 'restoration targets',
      datumType,
      tableName: TableNames.forestRestoration,
      variableName: 'restoration_targets',
    },
    {
      colName: 'answer',
      csvColumn: 'ha restored to date',
      datumType,
      tableName: TableNames.forestRestoration,
      variableName: 'hectares_restored',
    },
    {
      colName: CommentableDescriptionName.generalComments,
      colType: BulkDownloadColType.description,
      csvColumn: 'comments',
      datumType,
      tableName: TableNames.forestRestoration,
      variableName: CommentableDescriptionName.generalComments,
    },
  ]

  const row: BulkDownloadRow = { colNodes }

  return { fileName: 'ForestRestoration', includeDeskStudy: true, rows: [row] }
}
