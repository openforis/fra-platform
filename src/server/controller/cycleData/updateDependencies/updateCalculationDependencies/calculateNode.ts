import { Objects } from 'utils/objects'

import { Col, NodeValue, RowCache, TableName, VariableName } from 'meta/assessment'
import { RecordAssessmentDatas } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { Context } from 'server/controller/cycleData/updateDependencies/context/context'

type Props = {
  context: Context
  tableName: TableName
  variableName: VariableName
  row: RowCache
  col: Col
  formula: string
}

export const calculateNode = (props: Props): void => {
  const { context, col, formula, tableName, variableName, row } = props
  const { assessment, cycle, countryIso, data } = context

  // verify node value has not been inserted manually (see mirror tables)
  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { colName } = col.props
  const paramsValue = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data }
  const value = RecordAssessmentDatas.getNodeValue(paramsValue)
  if (Objects.isEmpty(value) || value.calculated) {
    const paramsCalculate = { assessment, countryIso, cycle, data, colName, row, formula }
    const rawResult = ExpressionEvaluator.evalFormula<string | undefined>(paramsCalculate)

    // Objects.isEmpty required to avoid failing on 0
    const value: NodeValue = { raw: !Objects.isEmpty(rawResult) ? String(rawResult) : null, calculated: true }

    context.result.push({ col, row, node: { tableName, variableName, colName, value } })
  }
}
