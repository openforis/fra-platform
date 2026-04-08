import './Folder.scss'
import React from 'react'
import classNames from 'classnames'

import Icon from 'client/components/Icon'

import { useRepositoryListContext } from '../../context'
import { Props } from './props'

const Folder: React.FC<Props> = (props) => {
  const { depth, isCollapsed, item } = props
  const { onNavigate, onToggle } = useRepositoryListContext()

  return (
    <div className="repository-list-item repository-list-item--folder" style={{ paddingLeft: depth * 20 }}>
      <div className={classNames('repository-folder', { expanded: !isCollapsed })}>
        <button onClick={() => onToggle(item.uuid)}>
          <Icon name="small-down" />
        </button>
        <button onClick={() => onNavigate(item.uuid)}>
          <Icon name="icon-folder" />
          {item.folderName}
        </button>
      </div>
    </div>
  )
}

export default Folder
