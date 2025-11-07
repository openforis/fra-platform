import { Arrays } from 'utils/arrays'

import { Col as TypeCol } from 'meta/assessment/col'
import { Cycle } from 'meta/assessment/cycle'
import { Row as TypeRow, RowType } from 'meta/assessment/row'
import { Table } from 'meta/assessment/table'
import { UUIDs } from 'meta/uuid'

import { ColHeader, ODPColHeader } from 'client/pages/Section/DataTable/Table/types'

type Props = {
  cycle: Cycle
  odpYears: Array<ODPColHeader>
  showODP: boolean
  table: Table
  print?: boolean
}

const getHeaders = (props: Props): Array<ColHeader> => {
  const { cycle, odpYears, print, showODP, table } = props

  let columnNames = table.props.columnNames[cycle.uuid]

  if (print && table.props.report?.[cycle.uuid]?.columnsReport) {
    columnNames = table.props.report[cycle.uuid].columnsReport
  } else if (table.props.odp && showODP) {
    const columnDiffs = Arrays.difference(
      odpYears.map(({ year }) => year),
      columnNames
    )
    columnNames = [...columnDiffs, ...columnNames].sort((a, b) => a.localeCompare(b))
  }

  return columnNames.map<ColHeader>((header) => {
    // Case ex. 1990_2000 => 1990-2000
    const columnName = /^\d{4}_\d{4}$/.test(header) ? header.replace('_', '-') : header
    return { columnName, odp: odpYears.find((o) => o.year === columnName) }
  })
}

export const parseTable = (props: Props): { headers: Array<ColHeader>; table: Table } => {
  const { cycle, table } = props
  const headers = getHeaders(props)

  if (!table.props.odp) {
    return { headers, table }
  }

  // Returns true if we are on header row that contains colNames (eg. '1990' or '% of forest area 2015')
  const isHeaderData = (row: TypeRow): boolean =>
    row.props.type === RowType.header && Boolean(headers?.find((h) => h.columnName === row.cols[0].props.colName))

  const rows = table.rows.map((row) => {
    let cols = row.cols.map((c) => c)
    const headerData = isHeaderData(row)

    if (headerData || row.props.type === RowType.data) {
      cols = headers.map<TypeCol>(({ columnName }) => {
        let col = row.cols.find((c) => c.props.colName === columnName)
        if (!col) {
          col = { ...row.cols[1], uuid: UUIDs.getUuid(), props: { ...row.cols[1].props, colName: columnName } }
        }
        return col
      })
      if (!headerData) {
        cols = [{ ...row.cols[0], uuid: UUIDs.getUuid() }, ...cols]
      }
    }

    if (row.props.type === RowType.header && !headerData) {
      cols = row.cols.map((col) => {
        const style = col.props.style[cycle.uuid]
        if (style.colSpan > 1) {
          return { ...col, uuid: UUIDs.getUuid(), props: { ...col.props, colSpan: headers.length } }
        }
        return col
      })
    }

    return { ...row, cols }
  })

  return { headers, table: { ...table, rows } }
}
