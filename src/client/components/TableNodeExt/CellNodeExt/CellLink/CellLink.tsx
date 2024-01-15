import React from 'react'

import { NodeExtCellType } from 'meta/nodeExt'

import { EditorWYSIWYGLinks } from 'client/components/EditorWYSIWYG'
import { NodeExtCell } from 'client/components/TableNodeExt/types'

import { CellProps } from '../CellProps'

const CellLink: React.FC<CellProps<NodeExtCell<NodeExtCellType.text>>> = (props) => {
  const { disabled, nodeExt, onChange } = props

  const value = nodeExt?.value?.raw ?? ''

  return <EditorWYSIWYGLinks disabled={disabled} onChange={onChange} value={value} />
}

export default CellLink
