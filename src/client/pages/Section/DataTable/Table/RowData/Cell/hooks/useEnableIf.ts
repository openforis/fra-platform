import { CountryIso } from 'meta/area/countryIso'
import { Col } from 'meta/assessment/col'
import { Row } from 'meta/assessment/row'
import { RowCache } from 'meta/assessment/rowCache'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data/recordData'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/routeParams'

interface Props {
  col: Col
  data: RecordAssessmentData
  row: Row
  sectionName: string
  table: Table
}

export const useEnableIf = (props: Props): boolean => {
  const { col, data, row, sectionName, table } = props

  const assessment = useAssessment()
  const cycle = useCycle()
  const { countryIso } = useCountryRouteParams<CountryIso>()

  const formula = col.props.enableIf?.[cycle.uuid]

  if (formula) {
    const rowCache: RowCache = {
      ...row,
      tableName: table.props.name,
      sectionName,
    }

    const { name: assessmentName } = assessment.props
    const { name: cycleName } = cycle
    const { colName } = col.props

    try {
      return ExpressionEvaluator.evalFormula<boolean>({
        assessmentName,
        assessments: { [assessmentName]: assessment },
        countryIso,
        cycleName,
        data,
        colName,
        row: rowCache,
        formula,
      })
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(
        `Error evaluating enableIf formula: "${formula}" for col "${colName}" row "${row.props.variableName}"`,
        e
      )
      return true
    }
  }

  return true
}
