import { useMemo } from 'react'

import { AssessmentName, Row, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { useCountryIso } from 'client/hooks'

import { parseTable } from './_parseTable'

type Props = {
  assessmentName: AssessmentName
  data: RecordAssessmentData
  table: Table
}

type Returned = {
  headers: Array<string>
  noticeMessages: Array<Row>
  rowsData: Array<Row>
  table: Table
  withReview: boolean
}

export const useParsedTable = (props: Props): Returned => {
  const { assessmentName, data, table: tableProps } = props

  const countryIso = useCountryIso()
  const cycle = useCycle()
  const showODP = useShowOriginalDatapoints()

  return useMemo<Returned>(() => {
    const { headers, table } = parseTable({
      assessmentName,
      countryIso,
      cycle,
      data,
      showODP,
      table: tableProps,
    })

    const rowsData: Array<Row> = []
    const noticeMessages: Array<Row> = []
    let withReview = !table.props.secondary

    table.rows.forEach((row) => {
      if (row.props.type === RowType.noticeMessage) {
        noticeMessages.push(row)
      } else if (!row.props.hidden && row.props.type !== RowType.header) {
        rowsData.push(row)
      }
      withReview = withReview || row.props.withReview?.[cycle.uuid]
    })

    return {
      headers,
      noticeMessages,
      rowsData,
      table,
      withReview,
    }
  }, [assessmentName, countryIso, cycle, data, showODP, tableProps])
}
