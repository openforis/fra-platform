import { useMemo } from 'react'

import { Col, Cols, Cycle, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useAssessmentCountry } from 'client/store/area'
import { useCycle } from 'client/store/assessment'
import { useOriginalDataPointYears } from 'client/store/data'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection'
import { getODPColSpan } from 'client/pages/Section/DataTable/Table/utils/getODPColSpan'
import { getODPHeader } from 'client/pages/Section/DataTable/Table/utils/getODPHeader'

type Props = {
  assessmentName: string
  col: Col
  colIndex: number
  data: RecordAssessmentData
  headers: Array<string>
  row: Row
  rowIndex: number
  table: Table
}

type Returned = {
  className: string
  cycle: Cycle
  gridColumn: string
  gridRow: string
  lastCol: boolean
  odpHeader?: {
    id: number
    year: string
  }
}

export const useGridHeadCellProps = (props: Props): Returned => {
  const { assessmentName, col, colIndex, data, headers, row, rowIndex, table } = props

  const country = useAssessmentCountry()
  const cycle = useCycle()
  const odpYears = useOriginalDataPointYears()
  const showOdp = useShowOriginalDatapoints()

  return useMemo<Returned>(() => {
    const { odp: isOdpTable } = table.props

    const { colSpan: defaultColSpan, rowSpan } = Cols.getStyle({ col, cycle })
    const columnName = headers[colIndex]

    const odpHeader = getODPHeader({ col, columnName, country, odpYears, showOdp, table })

    let colSpan = defaultColSpan
    if (isOdpTable && !defaultColSpan) {
      colSpan = getODPColSpan({ assessmentName, cycleName: cycle.name, data, headers, table })
    }

    const { index } = col.props
    const isHeaderLeft = (index === 0 && rowIndex === 0) || row.props?.readonly
    const className = `table-grid__data-cell ${isHeaderLeft ? 'left' : ''}`

    const gridColumn = `span ${colSpan}`
    const gridRow = `span ${rowSpan}`
    const lastCol = colIndex === row.cols.length - 1

    return {
      className,
      cycle,
      gridColumn,
      gridRow,
      lastCol,
      odpHeader,
    }
  }, [assessmentName, col, colIndex, country, cycle, data, headers, odpYears, row, rowIndex, showOdp, table])
}
