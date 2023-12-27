import React from 'react'

import { NodeExtCellType } from 'meta/nodeExt'

import { DataCell } from 'client/components/DataGrid'

import { NodeExtCell } from '../types'
import CellMultiselect from './CellMultiselect'
import { CellProps } from './CellProps'
import CellSelect from './CellSelect'
import CellText from './CellText'

type CellNodeExtFC = React.FC<CellProps<NodeExtCell<NodeExtCellType>>>

const components: Record<string, CellNodeExtFC> = {
  multiselect: CellMultiselect,
  select: CellSelect,
  text: CellText,
}

const CellNodeExt: CellNodeExtFC = (props) => {
  const { column, disabled, lastCol, lastRow, nodeExt, onChange } = props

  const Component = components[column.type]

  return (
    <DataCell editable={!disabled} lastCol={lastCol} lastRow={lastRow}>
      <Component
        column={column}
        disabled={disabled}
        lastCol={lastCol}
        lastRow={lastRow}
        nodeExt={nodeExt}
        onChange={onChange}
      />
    </DataCell>
  )
}

export default CellNodeExt
