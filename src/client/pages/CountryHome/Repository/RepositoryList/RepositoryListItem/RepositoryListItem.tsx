import React from 'react'

import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import Folder from 'client/pages/CountryHome/Repository/Folder'
import Item from 'client/pages/CountryHome/Repository/Item'

type Props = {
  depth?: number
  item: RepositoryItemTree
}

const Components = {
  folder: Folder,
  item: Item,
}

const RepositoryListItem: React.FC<Props> = (props) => {
  const { depth = 0, item } = props

  const Component = Components[item.folderName ? 'folder' : 'item']

  return (
    <>
      <div style={{ paddingLeft: depth * 16 }}>
        <Component repositoryItem={item} />
      </div>
      {item.children.map((child) => (
        <RepositoryListItem key={child.uuid} depth={depth + 1} item={child} />
      ))}
    </>
  )
}

export default RepositoryListItem
