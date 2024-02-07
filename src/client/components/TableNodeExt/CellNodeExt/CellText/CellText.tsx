import React from 'react'

import { NodeExtCellType } from 'meta/nodeExt'

import TextInput from 'client/components/Inputs/InputText'
import { NodeExtCell } from 'client/components/TableNodeExt/types'

import { CellProps } from '../CellProps'

const CellText: React.FC<CellProps<NodeExtCell<NodeExtCellType.text>>> = (props) => {
  const { disabled, nodeExt, onChange } = props

  return (
    <TextInput
      disabled={disabled}
      value={nodeExt?.value?.raw ?? null}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default CellText
