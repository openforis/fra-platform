import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { AssessmentName } from 'meta/assessment/assessment'
import { Cols } from 'meta/assessment/cols'
import { Row, RowType } from 'meta/assessment/row'
import { Table, TableNames } from 'meta/assessment/table'

import { useCountry } from 'client/store/area/hooks/country'
import { useHistoryLastApprovedIsActive } from 'client/store/data/history/hooks/lastApproved'
import { useCycle } from 'client/store/meta/hooks/cycles'
import { useShowOriginalDatapoints } from 'client/store/ui/countryReport/hooks/originalDataPoints'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'
import { ColHeader } from 'client/pages/Section/DataTable/Table/types'

import { transposeTable } from './_transpose/_transposeTable'
import { parseTable } from './_parseTable'
import { useOriginalDataPointYearsWithHistory } from './useOriginalDataPointYearsWithHistory'

type Props = {
  assessmentName: AssessmentName
  table: Table
}

type Returned = {
  firstHeaderRowSpan: number
  headers: Array<ColHeader>
  noticeMessages: Array<Row>
  rowsData: Array<Row>
  rowsHeader: Array<Row>
  table: Table
  withReview: boolean
}

export const useParsedTable = (props: Props): Returned => {
  const { assessmentName, table: _table } = props

  const { t } = useTranslation()
  const { countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const showODP = useShowOriginalDatapoints()
  const country = useCountry(countryIso)
  const odpYears = useOriginalDataPointYearsWithHistory({ assessmentName, table: _table })
  const historyLastApprovedIsActive = useHistoryLastApprovedIsActive()

  const { print } = useIsPrintRoute()

  return useMemo<Returned>(() => {
    const ignoreOdpYears =
      _table.props.name === TableNames.forestCharacteristics &&
      !historyLastApprovedIsActive &&
      !country?.props?.forestCharacteristics?.useOriginalDataPoint

    const _props = { cycle, odpYears: ignoreOdpYears ? [] : odpYears, showODP, table: _table, print }
    const { headers, table } = parseTable(_props)

    const rowsData: Array<Row> = []
    const rowsHeader: Array<Row> = []
    const noticeMessages: Array<Row> = []
    let withReview = !table.props.secondary

    table.rows.forEach((row) => {
      if (row.props.type === RowType.noticeMessage) {
        noticeMessages.push(row)
      } else if (!row.props.hidden && row.props.type !== RowType.header) {
        rowsData.push(row)
      } else if (row.props.type === RowType.header) {
        rowsHeader.push(row)
      }
      withReview = withReview || row.props.withReview?.[cycle.uuid]
    })

    // TODO: Why is this needed - check with YG
    const firstColHeader = rowsHeader[0]?.cols[0]
    let firstHeaderRowSpan = 0
    if (!Objects.isEmpty(firstColHeader)) {
      const { rowSpan } = Cols.getStyle({ col: firstColHeader, cycle })
      firstHeaderRowSpan = rowSpan ?? 1
    }

    // Transpose table
    if (print && table.props.report?.[cycle.uuid]?.transpose) {
      const transpose = transposeTable({ cycle, headers, rowsData, rowsHeader, table, t })
      return { firstHeaderRowSpan, noticeMessages, withReview, ...transpose }
    }

    return { firstHeaderRowSpan, headers, noticeMessages, rowsData, rowsHeader, table, withReview }
  }, [_table, country, cycle, historyLastApprovedIsActive, odpYears, print, showODP, t])
}
