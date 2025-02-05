import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentName, Cols, Row, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { ColHeader } from '../types'
import { parseTable } from './_parseTable'
import { useOriginalDataPointYearsWithHistory } from './useOriginalDataPointYearsWithHistory'

type Props = {
  assessmentName: AssessmentName
  data: RecordAssessmentData
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
  const { assessmentName, data, table: _table } = props

  const { countryIso } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const showODP = useShowOriginalDatapoints()
  const odpYears = useOriginalDataPointYearsWithHistory({ assessmentName, table: _table })

  return useMemo<Returned>(() => {
    const _props = { assessmentName, countryIso, cycle, data, odpYears, showODP, table: _table }
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

    const firstColHeader = rowsHeader[0]?.cols[0]
    let firstHeaderRowSpan = 0
    if (!Objects.isEmpty(firstColHeader)) {
      const { rowSpan } = Cols.getStyle({ col: firstColHeader, cycle })
      firstHeaderRowSpan = rowSpan ?? 1
    }

    return { firstHeaderRowSpan, headers, noticeMessages, rowsData, rowsHeader, table, withReview }
  }, [_table, assessmentName, countryIso, cycle, data, odpYears, showODP])
}
