import { Objects } from '@utils/objects'

import { Table } from '@meta/assessment'
import { TableData } from '@meta/data'

export const getODPColSpan = (props: { data: TableData; table: Table }): number => {
  if (Objects.isEmpty(props.data)) return 0
  // TableData = Record<table.props.name, Record<>>
  const [[, tableData]] = Object.entries(props.data)
  return Object.keys(tableData?.[props.table.props.name] || {}).length
}
