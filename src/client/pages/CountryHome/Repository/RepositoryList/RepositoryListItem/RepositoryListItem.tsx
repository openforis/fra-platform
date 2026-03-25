import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import Folder from 'client/pages/CountryHome/Repository/Folder'
import type { FolderProps } from 'client/pages/CountryHome/Repository/Folder/props'
import Item from 'client/pages/CountryHome/Repository/Item'
import type { ItemProps } from 'client/pages/CountryHome/Repository/Item/props'

type Props = {
  collapsed: Record<string, boolean>
  depth?: number
  item: RepositoryItemTree
  onToggle: (uuid: string) => void
}

const Components: Record<string, React.FC<FolderProps | ItemProps>> = {
  folder: Folder,
  item: Item,
}

const RepositoryListItem: React.FC<Props> = (props) => {
  const { collapsed, depth = 0, item, onToggle } = props

  const Component = Components[item.folderName ? 'folder' : 'item']
  const isCollapsed = collapsed[item.uuid]

  return (
    <>
      <div style={{ paddingLeft: depth * 20 }}>
        <Component isCollapsed={isCollapsed} onToggle={onToggle} repositoryItem={item} />
      </div>
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
