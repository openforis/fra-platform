import { Assessments } from 'meta/assessment/assessments'
import { Col } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { NodeValue } from 'meta/assessment/node'
import { RowCache } from 'meta/assessment/rowCache'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { Context } from 'meta/expressionEvaluator/context'
import { Objects } from 'utils/objects'

type Props = Pick<Context, 'assessmentName' | 'assessments' | 'cycleName' | 'countryIso' | 'data'> & {
  col: Col
  row: RowCache
  tableName: TableName
}

const calculateIf = (props: Props): boolean => {
  const { assessmentName, assessments, col, countryIso, cycleName, data, row } = props
  const { colName } = col.props
  const assessment = assessments[assessmentName]
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const formula = row.props.calculateIf?.[cycle.uuid]
  const paramsCalculate = { assessments, assessmentName, countryIso, cycleName, data, colName, row, formula }
  return Boolean(ExpressionEvaluator.evalFormula<boolean>(paramsCalculate))
}

const calculate = (props: Props): NodeValue | undefined => {
  const { assessmentName, assessments, col, countryIso, cycleName, data, row, tableName } = props

  const assessment = assessments[assessmentName]
  const cycle = Assessments.getCycle({ assessment, cycleName })
  const formula = Cols.getCalculateFn({ cycle, row, col })

  if (!formula) {
    return undefined
  }

  const { variableName } = row.props
  const { colName } = col.props

  const paramsValue = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data }
  const value = RecordAssessmentDatas.getNodeValue(paramsValue)

  // verify node value has not been inserted manually (see mirror tables) || calculateIf is verified
  const canCalculate = row.props.calculateIf?.[cycle.uuid]
    ? calculateIf(props)
    : Objects.isEmpty(value) || value.calculated

  if (canCalculate) {
    const paramsCalculate = { assessments, assessmentName, countryIso, cycleName, data, colName, row, formula }
    const rawResult = ExpressionEvaluator.evalFormula<string | undefined>(paramsCalculate)

    // Objects.isEmpty required to avoid failing on 0
    return { raw: !Objects.isEmpty(rawResult) ? String(rawResult) : null, calculated: true }
  }

  return undefined
}

export const NodeCalculations = {
  calculate,
}
