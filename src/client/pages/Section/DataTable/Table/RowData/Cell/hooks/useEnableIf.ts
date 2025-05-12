import { useTranslation } from 'react-i18next'

import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Col } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { RowCache } from 'meta/assessment/rowCache'
import { RecordAssessmentData } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

interface Props {
  assessment: Assessment
  cycle: Cycle
  data: RecordAssessmentData
  countryIso: CountryIso
  col: Col
  row: RowCache
}

export const useEnableIf = (props: Props): boolean => {
  const { assessment, cycle, data, countryIso, col, row } = props
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
