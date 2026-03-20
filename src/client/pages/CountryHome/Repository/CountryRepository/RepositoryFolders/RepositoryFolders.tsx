import './RepositoryFolders.scss'
import React, { useCallback } from 'react'
import classNames from 'classnames'

import { FolderNode } from '../hooks/useItems'
import FolderNodeItem from './FolderNodeItem/FolderNodeItem'

type Props = {
  tree: Array<FolderNode>
  selected: string | null
  onSelect: (uuid: string | null) => void
}

const RepositoryFolders = (props: Props): React.ReactElement => {
  const { onSelect, selected, tree } = props
  const onClickRoot = useCallback(() => onSelect(null), [onSelect])

  return (
    <div className="repository__folder__buttons">
      <button
        className={classNames('repository__folder__button', { selected: !selected })}
        onClick={onClickRoot}
        type="button"
      >
        Root
      </button>
      {tree.map((node) => (
        <FolderNodeItem key={node.uuid} node={node} onSelect={onSelect} selected={selected} />
      ))}
    </div>
  )
}

export default RepositoryFolders
