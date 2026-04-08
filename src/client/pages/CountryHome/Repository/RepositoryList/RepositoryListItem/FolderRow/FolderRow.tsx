import './FolderRow.scss'
import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import Folder from '../Folder'

export type Props = {
  depth: number
  isCollapsed: boolean
  item: RepositoryItemTree
}

const FolderRow: React.FC<Props> = (props) => {
  const { depth, isCollapsed, item } = props

  return (
    <div className="repository-list-item repository-list-item--folder" style={{ paddingLeft: depth * 20 }}>
      <Folder isCollapsed={isCollapsed} repositoryItem={item} />
    </div>
  )
}

export default FolderRow
