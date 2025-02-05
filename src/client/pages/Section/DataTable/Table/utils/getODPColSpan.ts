import { Arrays } from 'utils/arrays'
import { Objects } from 'utils/objects'

import { AssessmentName, CycleName, Table } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { ColHeader } from '../types'

type Props = {
  assessmentName: AssessmentName
  cycleName: CycleName
  data: RecordAssessmentData
  headers: Array<ColHeader>
  table: Table
}

export const getODPColSpan = (props: Props): number => {
  const { assessmentName, cycleName, data, headers, table } = props

  if (Objects.isEmpty(props.data?.[assessmentName]?.[cycleName])) return headers.length

  const [[, tableData]] = Object.entries(RecordAssessmentDatas.getCycleData({ assessmentName, cycleName, data }))
  const dataColumnNames = Object.keys(tableData?.[table.props.name] || {})

  const keysDifference = Arrays.difference(
    dataColumnNames,
    headers.map((h) => h.columnName)
  )

  return keysDifference.length + headers.length
}
