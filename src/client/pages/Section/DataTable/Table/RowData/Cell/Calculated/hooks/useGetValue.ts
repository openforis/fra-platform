import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Numbers } from 'utils/numbers'
import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { RowCache } from 'meta/assessment/rowCache'
import { ExpressionEvaluator } from 'meta/expressionEvaluator'

import { useAssessmentCountry } from 'client/store/area/hooks/country'
import { useRecordAssessmentDataWithOdp } from 'client/store/data/tableData/nodeValues/hooks/data'
import { useAssessment } from 'client/store/meta/hooks/assessments'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSectionRouteParams } from 'client/hooks/routeParams'
import { PropsCell } from 'client/pages/Section/DataTable/Table/RowData/Cell/props'

export const useGetValue = (props: PropsCell) => {
  const { col, nodeValue, row, table } = props

  const { countryIso, sectionName } = useSectionRouteParams<CountryIso>()

  const assessment = useAssessment()
  const cycle = useCycle()
  const country = useAssessmentCountry()

  const data = useRecordAssessmentDataWithOdp()

  const { t } = useTranslation()

  return useMemo(() => {
    if (!Objects.isEmpty(nodeValue?.raw)) {
      return Numbers.format(nodeValue.raw, row.props?.format?.integer ? 0 : 2)
    }

    if (col.props.calculateClientSide?.[cycle.uuid]) {
      const rowCache: RowCache = {
        ...row,
        tableName: table.props.name,
        sectionName,
      }

      return ExpressionEvaluator.evalFormula<string>({
        assessment,
        assessments: { [assessment.props.name]: assessment },
        countryIso,
        country,
        cycle,
        data,
        colName: col.props.colName,
        row: rowCache,
        formula: col.props.calculateFn[cycle.uuid],
        t,
      })
    }
    return ''
  }, [
    assessment,
    col.props.calculateClientSide,
    col.props.calculateFn,
    col.props.colName,
    country,
    countryIso,
    cycle,
    data,
    nodeValue.raw,
    row,
    sectionName,
    t,
    table.props.name,
  ])
}
