import { Objects } from 'utils/objects'

import { _transposeData } from './_transposeData'
import { _transposeHeaders } from './_transposeHeaders'
import { PropsTranspose, ReturnedTranspose } from './_types'

export const transposeTable = (props: PropsTranspose): ReturnedTranspose => {
  const { cycle, table: _table } = props
  const { uuid: cycleUUID } = cycle

  const { headers, rowsHeader } = _transposeHeaders(props)
  const { rowsData } = _transposeData(props)

  // update gridTemplateColumns
  const table = Objects.cloneDeep(_table)
  const path = ['props', 'style', cycleUUID, 'gridTemplateColumns']
  const colsSize = headers.length > 1 ? `minmax(min-content, 1fr)` : `max-content`
  const gridTemplateColumns = `minmax(100px, max-content) repeat(${headers.length}, ${colsSize})`
  Objects.setInPath({ obj: table, path, value: gridTemplateColumns })

  return { headers, table, rowsData, rowsHeader }
}
