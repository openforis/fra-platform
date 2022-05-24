import { Col as TypeCol, Row as TypeRow, RowType, Table } from '@meta/assessment'

export const parseTable = (props: { headers: Array<string>; table: Table }): Table => {
  const { headers, table } = props

  if (!table.props.odp) {
    return table
  }

  const isHeaderData = (row: TypeRow): boolean =>
    row.props.type === RowType.header && headers && headers.length > 0 && row.cols[0].props.colName === headers[0]

  const rows = table.rows.map((row) => {
    let cols = row.cols.map((c) => c)
    const headerData = isHeaderData(row)

    if (headerData || row.props.type === RowType.data) {
      cols = headers.map<TypeCol>((columnHeader) => {
        let col = row.cols.find((c) => c.props.colName === columnHeader)
        if (!col) {
          col = { ...row.cols[1], props: { ...row.cols[1].props, colName: columnHeader } }
        }
        return col
      })
      if (!headerData) {
        cols = [{ ...row.cols[0] }, ...cols]
      }
    }

    if (row.props.type === RowType.header && !headerData) {
      cols = row.cols.map((col) => {
        if (col.props.colSpan > 1) {
          return { ...col, props: { ...col.props, colSpan: headers.length } }
        }
        return col
      })
    }

    return { ...row, cols }
  })

  return { ...table, rows }
}
