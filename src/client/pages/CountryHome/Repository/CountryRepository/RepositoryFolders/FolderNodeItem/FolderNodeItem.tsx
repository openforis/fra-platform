import React, { useCallback } from 'react'
import classNames from 'classnames'

import { FolderNode } from '../../hooks/useItems'

type Props = {
  depth?: number
  node: FolderNode
  onSelect: (uuid: string | null) => void
  selected: string | null
}

const FolderNodeItem = (props: Props): React.ReactElement => {
  const { depth = 1, node, onSelect, selected } = props
  const onClick = useCallback(() => onSelect(node.uuid), [node.uuid, onSelect])

  return (
    <>
      <button
        className={classNames('repository__folder__button', { selected: selected === node.uuid })}
        onClick={onClick}
        style={{ paddingLeft: depth * 16 }}
        type="button"
      >
        {node.name} ({node.count})
      </button>
      {node.children.map((child) => (
        <FolderNodeItem key={child.uuid} depth={depth + 1} node={child} onSelect={onSelect} selected={selected} />
      ))}
    </>
  )
}

export default FolderNodeItem
