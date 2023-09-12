import { useMemo } from 'react'

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

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const tableName = table.props.name
  const { variableName } = row.props
  const { colName } = col.props

  return useMemo<NodeValue>(() => {
    const paramsGetValue = { assessmentName, cycleName, data, countryIso, tableName, variableName, colName }
    return RecordAssessmentDatas.getNodeValue(paramsGetValue)
  }, [assessmentName, colName, countryIso, cycleName, data, tableName, variableName])
}
