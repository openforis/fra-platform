import { useMemo } from 'react'

import { Col } from 'meta/assessment/col'
import { NodeValue } from 'meta/assessment/node'
import { Row } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useAssessment } from 'client/store/meta/assessment/hooks/assessments'
import { useCycle } from 'client/store/meta/assessment/hooks/cycles'
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
  const variableName = col.props.variableName ?? row.props.variableName
  const { colName } = col.props

  return useMemo<NodeValue>(() => {
    const paramsGetValue = { assessmentName, cycleName, data, countryIso, tableName, variableName, colName }
    return RecordAssessmentDatas.getNodeValue(paramsGetValue)
  }, [assessmentName, colName, countryIso, cycleName, data, tableName, variableName])
}
