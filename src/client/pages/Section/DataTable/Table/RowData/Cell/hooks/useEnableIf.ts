import { useTranslation } from 'react-i18next'

import { Col } from 'meta/assessment/col'
import { RowCache } from 'meta/assessment/rowCache'
import { RecordAssessmentData } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'

interface Props {
  data: RecordAssessmentData
  col: Col
  row: RowCache
}

export const useEnableIf = (props: Props): boolean => {
  const { data, col, row } = props
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const { t } = useTranslation()

  const enableIfFn = col.props.enableIf?.[cycle.uuid]

  if (enableIfFn) {
    try {
      return ExpressionEvaluator.evalFormula<boolean>({
        assessment,
        assessments: { [assessment.props.name]: assessment },
        countryIso,
        cycle,
        data,
        colName: col.props.colName,
        row,
        formula: enableIfFn,
        t,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        `Error evaluating enableIf formula: "${enableIfFn}" for col "${col.props.colName}" row "${row.props.variableName}"`,
        e
      )
      return true
    }
  }

  return true
}
