import './RepositoryListItem.scss'
import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import type { Props as FolderRowProps } from './FolderRow/FolderRow'
import FolderRow from './FolderRow'
import ItemRow from './ItemRow'

type Props = {
  collapsed: Record<string, boolean>
  depth?: number
  item: RepositoryItemTree
  onToggle: (uuid: string) => void
}

const Components: Record<string, React.FC<FolderRowProps>> = {
  folder: FolderRow,
  item: ItemRow,
}

const RepositoryListItem: React.FC<Props> = (props) => {
  const { collapsed, depth = 0, item, onToggle } = props

  const isCollapsed = collapsed[item.uuid]
  const Component = Components[item.folderName ? 'folder' : 'item']

  return (
    <>
      <Component depth={depth} isCollapsed={isCollapsed} item={item} onToggle={onToggle} />
      {!isCollapsed &&
        item.children.map((child) => (
          <RepositoryListItem
            key={child.uuid}
            collapsed={collapsed}
            depth={depth + 1}
            item={child}
            onToggle={onToggle}
          />
        ))}
    </>
  )
}

export default RepositoryListItem
