import { useMemo } from 'react'

import { Row, RowType, Table } from 'meta/assessment'

export const useRowsData = (props: { table: Table }): Array<Row> => {
  const { table } = props
  return useMemo(() => table.rows.filter((row) => row.props.type !== RowType.header), [table.rows])
}
