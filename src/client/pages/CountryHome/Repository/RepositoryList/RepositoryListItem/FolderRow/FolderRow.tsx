import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import Folder from '../Folder'

export type Props = {
  depth: number
  isCollapsed: boolean
  item: RepositoryItemTree
  onToggle: (uuid: string) => void
}

const FolderRow: React.FC<Props> = (props) => {
  const { depth, isCollapsed, item, onToggle } = props

  return (
    <div className="repository-list-item">
      <div style={{ paddingLeft: depth * 20 }}>
        <Folder isCollapsed={isCollapsed} onToggle={onToggle} repositoryItem={item} />
      </div>
      {/* Empty divs to compensate empty columns in CSS-grid */}
      <div />
      <div />
      <div />
    </div>
  )
}

export default FolderRow
