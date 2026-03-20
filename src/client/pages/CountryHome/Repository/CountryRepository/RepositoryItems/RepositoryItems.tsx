import './RepositoryItems.scss'
import React from 'react'

import { RepositoryItem } from 'meta/cycleData/repository/item'

import Item from 'client/pages/CountryHome/Repository/Item'

type Props = {
  items: Array<RepositoryItem>
  selectedFolder: string | null
}

const RepositoryItems = (props: Props): React.ReactElement => {
  const { items, selectedFolder } = props

  // When folder is selected, show only items beloging to that folder
  // When in root, show only items without folder
  // replace isRootItem with true do display all items under root
  const visibleItems = items.filter((item) => {
    const inRoot = selectedFolder === null
    const isRootItem = !item.folderUuid
    return inRoot ? isRootItem : item.folderUuid === selectedFolder
  })

  return (
    <div className="repository__items">
      {visibleItems.map((item) => (
        <Item key={item.uuid} repositoryItem={item} />
      ))}
    </div>
  )
}

export default RepositoryItems
