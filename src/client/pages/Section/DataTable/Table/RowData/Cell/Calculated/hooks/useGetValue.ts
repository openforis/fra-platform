import { useMemo } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { RowCache } from 'meta/assessment/rowCache'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'
import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useRecordAssessmentDataWithOdp } from 'client/store/data/tableData/nodeValues/hooks/data'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { PropsCell } from 'client/pages/Section/DataTable/Table/RowData/Cell/props'

export const useGetValue = (props: PropsCell): string => {
  const { col, nodeValue, row, table } = props

  const { countryIso, sectionName } = useSectionRouteParams<CountryIso>()
  const assessment = useAssessment()
  const cycle = useCycle()
  const country = useAssessmentCountry()
  const data = useRecordAssessmentDataWithOdp()

  const { name: assessmentName } = assessment.props
  const { name: cycleName, uuid: cycleUuid } = cycle
  const { colName } = col.props
  const { name: tableName } = table.props

  return useMemo(() => {
    if (!Objects.isEmpty(nodeValue?.raw)) {
      return Numbers.format(nodeValue.raw, row.props?.format?.integer ? 0 : 2)
    }

    if (col.props.calculateClientSide?.[cycleUuid]) {
      const rowCache: RowCache = { ...row, tableName, sectionName }

      return ExpressionEvaluator.evalFormula<string>({
        assessmentName,
        assessments: { [assessmentName]: assessment },
        countryIso,
        country,
        cycleName,
        data,
        colName,
        row: rowCache,
        formula: col.props.calculateFn[cycleUuid],
      })
    }

    return ''
  }, [
    assessment,
    assessmentName,
    col.props.calculateClientSide,
    col.props.calculateFn,
    colName,
    country,
    countryIso,
    cycleName,
    cycleUuid,
    data,
    nodeValue.raw,
    row,
    sectionName,
    tableName,
  ])
}
