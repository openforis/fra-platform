import React from 'react'

import { NodeExtCellType } from 'meta/nodeExt'

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
  const { column, disabled, nodeExt, onChange } = props

  const Component = components[column.type]

  return <Component column={column} disabled={disabled} nodeExt={nodeExt} onChange={onChange} />
}

export default CellNodeExt
