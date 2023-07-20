import { useMemo } from 'react'

import { Col, Cols, NodeValue, Row, Table } from 'meta/assessment'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useRecordAssessmentDataWithOdp } from 'client/store/data'
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
  const dataWithOdp = useRecordAssessmentDataWithOdp()

  return useMemo<NodeValue>(() => {
    const assessmentName = assessment.props.name
    const cycleName = cycle.name
    const tableName = table.props.name
    const { variableName } = row.props
    const { colName } = col.props
    const formula = Cols.getCalculateFn({ cycle, row, col })

    const paramsGetValue = { assessmentName, cycleName, data, countryIso, tableName, variableName, colName }
    const nodeValue = RecordAssessmentDatas.getNodeValue(paramsGetValue)

    if (formula && (!nodeValue || !nodeValue.raw || nodeValue.calculated)) {
      const paramsCalculate = { assessment, countryIso, cycle, data: dataWithOdp, colName, row, formula }
      const raw = ExpressionEvaluator.evalFormula<string | unknown>(paramsCalculate)
      return { raw, calculated: true }
    }

    return nodeValue
  }, [assessment, col, countryIso, cycle, data, dataWithOdp, row, table.props.name])
}
