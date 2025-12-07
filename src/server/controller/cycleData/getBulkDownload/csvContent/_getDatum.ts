import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { SectionName } from 'meta/assessment/section'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { parseDescription } from 'server/controller/cycleData/getBulkDownload/csvContent/_parsers'
import { BulkDownloadColType, BulkDownloadGetDatum } from 'server/controller/cycleData/getBulkDownload/types'

export const getDatumDescription: BulkDownloadGetDatum = (props) => {
  const { countryIso, data, tableName, variableName } = props

  const { descriptions } = data

  const value =
    descriptions?.[countryIso]?.[tableName as SectionName]?.[variableName as CommentableDescriptionName]?.text

  return value ? parseDescription(value) : ''
}

export const getDatumTableNode: BulkDownloadGetDatum = (props) => {
  const { assessmentName, colName, countryIso, cycleName, data, tableName, variableName } = props

  const propsDatum = { assessmentName, colName, countryIso, cycleName, data: data.tables, tableName, variableName }
  return RecordAssessmentDatas.getDatum(propsDatum)
}

export const GetDatumRecord: { [key in BulkDownloadColType]?: BulkDownloadGetDatum } = {
  [BulkDownloadColType.description]: getDatumDescription,
  [BulkDownloadColType.tableNode]: getDatumTableNode,
}
