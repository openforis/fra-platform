import { CommentableDescriptionName } from 'meta/assessment/descriptionValue'
import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'
import { SectionName } from 'meta/assessment/section'
import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

const mFlagTables = new Set<TableName>([
  TableNames.biomassStock,
  TableNames.biomassStockAvg,
  TableNames.carbonStock,
  TableNames.carbonStockAvg,
  TableNames.growingStockAvg,
])

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

export const getDatumFlag: BulkDownloadGetDatum = (props) => {
  const { assessmentName, colName, countryIso, cycleName, data, deskStudy, tableName, variableName } = props

  if (mFlagTables.has(tableName)) {
    const forestArea = RecordAssessmentDatas.getDatum({
      assessmentName,
      colName,
      countryIso,
      cycleName,
      data: data.tables,
      tableName: TableNames.extentOfForest,
      variableName: 'forestArea',
    })
    const forestAreaBN = Numbers.toBigNumber(forestArea)
    if (forestAreaBN.isFinite() && forestAreaBN.isZero()) return 'M'
  }

  const nodeValue = RecordAssessmentDatas.getNodeValue({
    assessmentName,
    colName,
    countryIso,
    cycleName,
    data: data.tables,
    tableName,
    variableName,
  })

  const isImputed = deskStudy || nodeValue?.faoEstimate
  if (isImputed) return 'I'
  if (nodeValue?.raw == null) return 'O'
  return 'A'
}

const getDatumNDP: BulkDownloadGetDatum = (props) => {
  const { colName, countryIso, data, i18n, variableName } = props
  const countryData = data.odp[countryIso]

  if (Objects.isNil(countryData)) return null

  const tableKey = variableName as keyof BulkDownloadODPCountryData
  const value = countryData[tableKey]

  if (tableKey === 'dataSourceMethods') {
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
  [BulkDownloadColType.flag]: getDatumFlag,
  [BulkDownloadColType.odp]: getDatumNDP,
  [BulkDownloadColType.tableNode]: getDatumTableNode,
}
