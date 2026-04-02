import './RepositoryList.scss'
import React from 'react'

import RepositoryListItem from 'client/pages/CountryHome/Repository/RepositoryList/RepositoryListItem'

import { useFolderNavigation } from './hooks/useFolderNavigation'
import { useGetItems } from './hooks/useGetItems'
import { useItems } from './hooks/useItems'
import { useOnToggle } from './hooks/useOnToggle'
import Breadcrumb from './Breadcrumb'
import { RepositoryListContext } from './context'
import Filters from './Filters'
import Toolbar from './Toolbar'

type Props = {
  isGlobal?: boolean
}

const RepositoryList: React.FC<Props> = (props) => {
  const { isGlobal } = props

  useGetItems(isGlobal)
  const items = useItems(isGlobal)
  const { collapsed, onToggle } = useOnToggle()
  const { contextValue, visibleItems } = useFolderNavigation({ collapsed, items, onToggle })

  return (
    <RepositoryListContext.Provider value={contextValue}>
      <div className="repository-list">
        <Filters isGlobal={isGlobal} />
        <Breadcrumb />
        <Toolbar isGlobal={isGlobal} />
        {visibleItems.map((item) => (
          <RepositoryListItem key={item.uuid} item={item} />
        ))}
      </div>
    </RepositoryListContext.Provider>
  )
}

export default RepositoryList
