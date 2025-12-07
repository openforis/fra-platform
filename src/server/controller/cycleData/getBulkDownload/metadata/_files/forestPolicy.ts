import { ColName } from 'meta/assessment/col'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { TableNames } from 'meta/assessment/table'

import { ForestPolicyBuilder } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/forestPolicy'
import { BulkDownloadFileFactory } from 'server/controller/cycleData/getBulkDownload/metadata/_types'
import {
  BulkDownloadColDescription,
  BulkDownloadColNode,
  BulkDownloadRow,
} from 'server/controller/cycleData/getBulkDownload/types'

const colCsvColumns: Record<ColName, string> = {
  national_yes_no: 'National',
  sub_national_yes_no: 'Sub-national',
}

export const getForestPolicy: BulkDownloadFileFactory = (props) => {
  const forestPolicyBuilder = new ForestPolicyBuilder({ file: { fileName: '', rows: [] }, props })
  const baseColNodes = forestPolicyBuilder.getBaseColNodes()

  const colNodes = baseColNodes.map<BulkDownloadColNode>((variable) => {
    const { colName, tableName, type, variableName } = variable
    const csvColumn = `${colCsvColumns[colName]} ${variableName.split('_').join(' ')}`
    return { colName, csvColumn, tableName, type, variableName }
  })

  const comments: BulkDownloadColDescription = {
    csvColumn: 'comments',
    name: CommentableDescriptionName.generalComments,
    sectionName: TableNames.forestPolicy,
  }

  const row: BulkDownloadRow = { colDescriptions: [comments], colNodes }

  return { fileName: 'ForestPolicy', rows: [row] }
}
