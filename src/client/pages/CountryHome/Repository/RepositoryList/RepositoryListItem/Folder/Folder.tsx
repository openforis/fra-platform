import './Folder.scss'
import React from 'react'
import classNames from 'classnames'

import Icon from 'client/components/Icon'

import { useRepositoryListContext } from '../../context'
import { FolderProps } from './props'

const Folder: React.FC<FolderProps> = (props) => {
  const { isCollapsed, repositoryItem } = props
  const { onNavigate, onToggle } = useRepositoryListContext()

  return (
    <div className={classNames('repository-folder', { expanded: !isCollapsed })}>
      <button onClick={() => onToggle(repositoryItem.uuid)}>
        <Icon name="small-down" />
      </button>
      <button onClick={() => onNavigate(repositoryItem.uuid)}>
        <Icon name="icon-folder" />
        {repositoryItem.folderName}
      </button>
    </div>
  )
}

export default Folder
