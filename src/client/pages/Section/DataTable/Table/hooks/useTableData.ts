import { useMemo } from 'react'

import { AssessmentName, Row, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { useCountryIso } from 'client/hooks'

import { parseTable } from '../utils/parseTable'

type Props = {
  assessmentName: AssessmentName
  data: RecordAssessmentData
  table: Table
}

type Returned = {
  headers: Array<string>
  noticeMessages: Array<Row>
  parsedTable: Table
  rowsData: Array<Row>
}

export const useTableData = (props: Props): Returned => {
  const { assessmentName, data, table: tableProps } = props

  const countryIso = useCountryIso()
  const cycle = useCycle()
  const showODP = useShowOriginalDatapoints()

  return useMemo<Returned>(() => {
    const { headers, table: parsedTable } = parseTable({
      assessmentName,
      countryIso,
      cycle,
      data,
      showODP,
      table: tableProps,
    })

    const rowsData: Array<Row> = []
    const noticeMessages: Array<Row> = []

    parsedTable.rows.forEach((row) => {
      if (row.props.type === RowType.noticeMessage) {
        noticeMessages.push(row)
      } else if (!row.props.hidden && row.props.type !== RowType.header) {
        rowsData.push(row)
      }
    })

    return {
      headers,
      noticeMessages,
      parsedTable,
      rowsData,
    }
  }, [assessmentName, countryIso, cycle, data, showODP, tableProps])
}
