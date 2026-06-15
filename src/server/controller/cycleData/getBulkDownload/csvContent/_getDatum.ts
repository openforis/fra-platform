import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'
import { SectionName } from 'meta/assessment/section'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Objects } from 'utils/objects'

import { parseDescription } from 'server/controller/cycleData/getBulkDownload/csvContent/_parsers'
import {
  BulkDownloadColType,
  BulkDownloadGetDatum,
  BulkDownloadODPCountryData,
} from 'server/controller/cycleData/getBulkDownload/types'

export const getDatumDescription: BulkDownloadGetDatum = (props) => {
  const { countryIso, data, tableName, variableName } = props

  const { descriptions } = data

  const value =
    descriptions?.[countryIso]?.[tableName as SectionName]?.[variableName as CommentableDescriptionName]?.text

  return value ? parseDescription(value) : ''
}

const getDatumNDP: BulkDownloadGetDatum = (props) => {
  const { colName, countryIso, data, i18n, variableName } = props
  const countryData = data.odp[countryIso]

  if (Objects.isNil(countryData)) return null

  const tableKey = variableName as keyof BulkDownloadODPCountryData
  const value = countryData[tableKey]

  if (tableKey === 'dataSourceTypes') {
    const method = colName as ODPDataSourceMethod
    const included = Boolean(value?.includes(method))
    return i18n.t(`yesNoTextSelect.${included ? 'yes' : 'no'}`)
  }

  return value as string
}

export const getDatumTableNode: BulkDownloadGetDatum = (props) => {
  const { assessmentName, colName, countryIso, cycleName, data, tableName, variableName } = props

  const propsDatum = { assessmentName, colName, countryIso, cycleName, data: data.tables, tableName, variableName }
  return RecordAssessmentDatas.getDatum(propsDatum)
}

export const GetDatumRecord: { [key in BulkDownloadColType]?: BulkDownloadGetDatum } = {
  [BulkDownloadColType.description]: getDatumDescription,
  [BulkDownloadColType.odp]: getDatumNDP,
  [BulkDownloadColType.tableNode]: getDatumTableNode,
}
