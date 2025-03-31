import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, RecordAssessments } from 'meta/assessment/assessment'
import { Col } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'
import { Cycle } from 'meta/assessment/cycle'
import { NodeValue } from 'meta/assessment/node'
import { RowCache } from 'meta/assessment/rowCache'
import { TableName } from 'meta/assessment/table'
import { RecordAssessmentDatas, RecordCountryData } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

type Props = {
  assessments: RecordAssessments
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  tableName: TableName
  row: RowCache
  col: Col
  data: RecordCountryData
}

const calculateIf = (props: Props): boolean => {
  const { assessments, assessment, cycle, countryIso, row, col, data } = props
  const { colName } = col.props
  const formula = row.props.calculateIf?.[cycle.uuid]

  const paramsCalculate = { assessments, assessment, countryIso, cycle, data, colName, row, formula }
  return Boolean(ExpressionEvaluator.evalFormula<boolean>(paramsCalculate))
}

const calculate = (props: Props): NodeValue | undefined => {
  const { assessments, assessment, cycle, countryIso, tableName, row, col, data } = props
  const formula = Cols.getCalculateFn({ cycle, row, col })

  if (!formula) {
    return undefined
  }

  const assessmentName = assessment.props.name
  const cycleName = cycle.name
  const { variableName } = row.props
  const { colName } = col.props

  const paramsValue = { assessmentName, cycleName, countryIso, tableName, variableName, colName, data }
  const value = RecordAssessmentDatas.getNodeValue(paramsValue)

  // verify node value has not been inserted manually (see mirror tables) || calculateIf is verified
  const canCalculate = row.props.calculateIf?.[cycle.uuid]
    ? calculateIf(props)
    : Objects.isEmpty(value) || value.calculated

  if (canCalculate) {
    const paramsCalculate = { assessments, assessment, countryIso, cycle, data, colName, row, formula }
    const rawResult = ExpressionEvaluator.evalFormula<string | undefined>(paramsCalculate)

    // Objects.isEmpty required to avoid failing on 0
    return { raw: !Objects.isEmpty(rawResult) ? String(rawResult) : null, calculated: true }
  }

  return undefined
}

export const NodeCalculations = {
  calculate,
}
