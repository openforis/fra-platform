import './Folder.scss'
import React from 'react'
import classNames from 'classnames'

import Icon from 'client/components/Icon'

import { FolderProps } from './props'

const Folder: React.FC<FolderProps> = (props) => {
  const { isCollapsed, onToggle, repositoryItem } = props

  return (
    <button
      className={classNames('repository-folder', { expanded: !isCollapsed })}
      onClick={() => onToggle(repositoryItem.uuid)}
    >
      <Icon name="small-down" />
      <Icon name="icon-folder" />
      {repositoryItem.folderName}
    </button>
  )
}

export default Folder
