import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { TableName, TableNames } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { BulkDownloadData } from 'server/controller/cycleData/bulkDownload/types'

const mFlagTables = new Set<TableName>([
  TableNames.biomassStock,
  TableNames.biomassStockAvg,
  TableNames.carbonStock,
  TableNames.carbonStockAvg,
  TableNames.growingStockAvg,
])

type Props = {
  assessmentName: AssessmentName
  colName: string
  countryIso: CountryIso
  cycleName: CycleName
  data: BulkDownloadData
  deskStudy?: boolean
  tableName: TableName
  variableName: string
}

export const getFlag = (props: Props): string => {
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

  if (Objects.isNil(nodeValue?.raw)) return 'O'
  const isImputed = deskStudy || nodeValue?.faoEstimate
  if (isImputed) return 'I'
  return 'A'
}
