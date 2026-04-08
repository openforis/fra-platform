import './RepositoryList.scss'
import React from 'react'

import RepositoryListItem from 'client/pages/CountryHome/Repository/RepositoryList/RepositoryListItem'

import { useFolderNavigation } from './hooks/useFolderNavigation'
import { useGetItems } from './hooks/useGetItems'
import { useItems } from './hooks/useItems'
import { useOnToggle } from './hooks/useOnToggle'
import ColumnHeaders from './ColumnHeaders'
import { RepositoryListContext } from './context'
import Header from './Header'

type Props = {
  isGlobal?: boolean
  title: string
}

const RepositoryList: React.FC<Props> = (props) => {
  const { isGlobal, title } = props

  useGetItems(isGlobal)
  const items = useItems(isGlobal)
  const { collapsed, onToggle } = useOnToggle()
  const { contextValue, visibleItems } = useFolderNavigation({ collapsed, items, onToggle })

  return (
    <RepositoryListContext.Provider value={contextValue}>
      <div className="repository-list">
        <div className="repository-list__title">{title}</div>
        <Header isGlobal={isGlobal} />
        <ColumnHeaders isGlobal={isGlobal} />
        {visibleItems.map((item) => (
          <RepositoryListItem key={item.uuid} item={item} />
        ))}
      </div>
    </RepositoryListContext.Provider>
  )
}

export default RepositoryList
