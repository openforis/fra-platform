import { Objects } from 'utils/objects'

import { TableName, TableNames } from 'meta/assessment/table'

import { _transposeData } from './_transposeData'
import { _transposeHeaders } from './_transposeHeaders'
import { PropsTranspose, ReturnedTranspose } from './_types'

const customGridTemplateColumns: Record<TableName, string> = {
  [TableNames.sustainableDevelopment15_2_1_5]: `0.3fr max-content`,
}

export const transposeTable = (props: PropsTranspose): ReturnedTranspose => {
  const { cycle, table: _table } = props
  const { uuid: cycleUUID } = cycle
  const { name: tableName } = _table.props

  const { headers, rowsHeader } = _transposeHeaders(props)
  const { rowsData } = _transposeData(props)

  // update gridTemplateColumns
  const table = Objects.cloneDeep(_table)
  const path = ['props', 'style', cycleUUID, 'gridTemplateColumns']
  const gridTemplateColumns =
    customGridTemplateColumns[tableName] ??
    `minmax(100px, max-content) repeat(${headers.length}, minmax(min-content, 1fr))`
  Objects.setInPath({ obj: table, path, value: gridTemplateColumns })

  return { headers, table, rowsData, rowsHeader }
}
