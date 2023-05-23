import { Arrays } from '@utils/arrays'
import { Objects } from '@utils/objects'

import { AssessmentName, CycleName, Table } from '@meta/assessment'
import { RecordAssessmentData } from '@meta/data'

export const getODPColSpan = (props: {
  assessmentName: AssessmentName
  cycleName: CycleName
  data: RecordAssessmentData
  headers: Array<string>
  table: Table
}): number => {
  const { assessmentName, cycleName, data, headers, table } = props
  if (Objects.isEmpty(props.data?.[assessmentName]?.[cycleName])) return headers.length

  const [[, tableData]] = Object.entries(data[assessmentName][cycleName])
  const tableDataKeys = Object.keys(tableData?.[table.props.name] || {})

  const keysDifference = Arrays.difference(tableDataKeys, headers)

  return keysDifference.length + headers.length
}
