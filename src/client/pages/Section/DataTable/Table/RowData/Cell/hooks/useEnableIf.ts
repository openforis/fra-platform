import { useTranslation } from 'react-i18next'

import { Col } from 'meta/assessment/col'
import { Row } from 'meta/assessment/row'
import { RowCache } from 'meta/assessment/rowCache'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'

interface Props {
  col: Col
  data: RecordAssessmentData
  row: Row
  sectionName: string
  table: Table
}

export const useEnableIf = (props: Props): boolean => {
  const { data, col, row, sectionName, table } = props
  const assessment = useAssessment()
  const cycle = useCycle()
  const countryIso = useCountryIso()
  const { t } = useTranslation()

  const enableIfFn = col.props.enableIf?.[cycle.uuid]

  if (enableIfFn) {
    const rowCache: RowCache = {
      ...row,
      tableName: table.props.name,
      sectionName,
    }

    try {
      return ExpressionEvaluator.evalFormula<boolean>({
        assessment,
        assessments: { [assessment.props.name]: assessment },
        countryIso,
        cycle,
        data,
        colName: col.props.colName,
        row: rowCache,
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
