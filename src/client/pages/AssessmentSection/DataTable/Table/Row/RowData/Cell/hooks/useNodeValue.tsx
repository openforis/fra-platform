import { Col, NodeValue, Row, Table } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'

type Props = {
  col: Col
  data: RecordAssessmentData
  row: Row
  table: Table
}

export const useNodeValue = (props: Props): NodeValue => {
  const { col, data, row, table } = props

  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()

  const params = {
    assessmentName: assessment.props.name,
    cycleName: cycle.name,
    data,
    countryIso,
    tableName: table.props.name,
    variableName: row.props.variableName,
    colName: col.props.colName,
  }
  return RecordAssessmentDatas.getNodeValue(params)
}
