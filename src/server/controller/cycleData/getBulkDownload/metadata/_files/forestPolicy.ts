import { ColName } from 'meta/assessment/col'
import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'

import { getForestPolicy as getForestPolicyTable } from 'server/controller/cycleData/getBulkDownload/metadata/_tables/forestPolicy'
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
  const forestPolicyTable = getForestPolicyTable(props)
  const { tableName, variables } = forestPolicyTable

  const colNodes = variables.map<BulkDownloadColNode>((variable) => {
    const { colName, type, variableName } = variable
    const csvColumn = `${colCsvColumns[colName]} ${variableName.split('_').join(' ')}`
    return { colName, csvColumn, tableName, type, variableName }
  })

  const comments: BulkDownloadColDescription = {
    csvColumn: 'comments',
    name: CommentableDescriptionName.generalComments,
    sectionName: tableName,
  }

  const row: BulkDownloadRow = { colDescriptions: [comments], colNodes }

  return { fileName: 'ForestPolicy', rows: [row] }
}
