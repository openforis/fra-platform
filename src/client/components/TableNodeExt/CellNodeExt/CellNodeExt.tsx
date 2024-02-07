import React from 'react'

import { NodeExtCellType } from 'meta/nodeExt'

import { DataCell } from 'client/components/DataGrid'
import CellLink from 'client/components/TableNodeExt/CellNodeExt/CellLink'
import CellMultiselect from 'client/components/TableNodeExt/CellNodeExt/CellMultiselect'
import CellSelect from 'client/components/TableNodeExt/CellNodeExt/CellSelect'
import CellText from 'client/components/TableNodeExt/CellNodeExt/CellText'

import { NodeExtCell } from '../types'
import { CellProps } from './CellProps'

type CellNodeExtFC = React.FC<CellProps<NodeExtCell<NodeExtCellType>>>

const components: Record<string, CellNodeExtFC> = {
  multiselect: CellMultiselect,
  select: CellSelect,
  text: CellText,
  link: CellLink,
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
