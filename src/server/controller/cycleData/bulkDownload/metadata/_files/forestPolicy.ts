import { ColName } from 'meta/assessment/col'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { TableNames } from 'meta/assessment/table'

import { ForestPolicyBuilder } from 'server/controller/cycleData/bulkDownload/metadata/_tables/forestPolicy'
import { BulkDownloadFileFactory } from 'server/controller/cycleData/bulkDownload/metadata/_types'
import {
  BulkDownloadColNode,
  BulkDownloadColType,
  BulkDownloadDatumType,
  BulkDownloadRow,
} from 'server/controller/cycleData/bulkDownload/types'

const colCsvColumns: Record<ColName, string> = {
  national_yes_no: 'National',
  sub_national_yes_no: 'Sub-national',
}

export const getForestPolicy: BulkDownloadFileFactory = (props) => {
  const forestPolicyBuilder = new ForestPolicyBuilder({ file: { fileName: '', rows: [] }, props })
  const baseColNodes = forestPolicyBuilder.getBaseColNodes()

  const colNodes = baseColNodes.map<BulkDownloadColNode>((variable) => {
    const { colName, datumType, tableName, variableName } = variable
    const csvColumn = `${colCsvColumns[colName]} ${variableName.split('_').join(' ')}`
    return { colName, csvColumn, datumType, tableName, variableName }
  })

  colNodes.push({
    colName: CommentableDescriptionName.generalComments,
    colType: BulkDownloadColType.description,
    csvColumn: 'comments',
    datumType: BulkDownloadDatumType.string,
    tableName: TableNames.forestPolicy,
    variableName: CommentableDescriptionName.generalComments,
  })

  const row: BulkDownloadRow = { colNodes }

  return { fileName: 'ForestPolicy', includeDeskStudy: true, rows: [row] }
}
