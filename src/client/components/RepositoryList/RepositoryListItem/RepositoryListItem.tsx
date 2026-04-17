import './RepositoryListItem.scss'
import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'
import { RepositoryItems } from 'meta/cycleData/repository/items'

import { useRepositoryListContext } from '../context'
import type { Props as FolderProps } from './Folder/props'
import Folder from './Folder'
import ItemRow from './ItemRow'

type Props = {
  depth?: number
  item: RepositoryItemTree
}

const Components: Record<string, React.FC<FolderProps>> = {
  folder: Folder,
  item: ItemRow,
}

const RepositoryListItem: React.FC<Props> = (props) => {
  const { depth = 0, item } = props
  const { expanded } = useRepositoryListContext()

  const isCollapsed = !expanded[item.uuid]
  const Component = Components[RepositoryItems.isFolder(item) ? 'folder' : 'item']

  return (
    <>
      <Component depth={depth} isCollapsed={isCollapsed} item={item} />
      {!isCollapsed &&
        item.children.map((child) => <RepositoryListItem key={child.uuid} depth={depth + 1} item={child} />)}
    </>
  )
}

export default RepositoryListItem
