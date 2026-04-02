import './RepositoryListItem.scss'
import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useRepositoryListContext } from '../context'
import type { Props as FolderRowProps } from './FolderRow/FolderRow'
import FolderRow from './FolderRow'
import ItemRow from './ItemRow'

type Props = {
  depth?: number
  item: RepositoryItemTree
}

const Components: Record<string, React.FC<FolderRowProps>> = {
  folder: FolderRow,
  item: ItemRow,
}

const RepositoryListItem: React.FC<Props> = (props) => {
  const { depth = 0, item } = props
  const { collapsed } = useRepositoryListContext()

  const isCollapsed = collapsed[item.uuid]
  const Component = Components[item.folderName ? 'folder' : 'item']

  return (
    <>
      <Component depth={depth} isCollapsed={isCollapsed} item={item} />
      {!isCollapsed &&
        item.children.map((child) => <RepositoryListItem key={child.uuid} depth={depth + 1} item={child} />)}
    </>
  )
}

export default RepositoryListItem
