import { Arrays } from '@utils/arrays'
import { Objects } from '@utils/objects'

import { Table } from '@meta/assessment'
import { TableData } from '@meta/data'

export const getODPColSpan = (props: { data: TableData; headers: Array<string>; table: Table }): number => {
  const { data, headers, table } = props
  if (Objects.isEmpty(props.data)) return headers.length

  const [[, tableData]] = Object.entries(data)
  const tableDataKeys = Object.keys(tableData?.[table.props.name] || {})

  const keysDifference = Arrays.difference(tableDataKeys, headers)

  return keysDifference.length + headers.length
}
