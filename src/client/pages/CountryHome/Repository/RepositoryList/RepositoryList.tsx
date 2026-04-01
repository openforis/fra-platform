import './RepositoryList.scss'
import React from 'react'

import RepositoryListItem from 'client/pages/CountryHome/Repository/RepositoryList/RepositoryListItem'

import { useGetItems } from './hooks/useGetItems'
import { useItems } from './hooks/useItems'
import { useOnToggle } from './hooks/useOnToggle'
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

  return (
    <div className="repository-list">
      <Filters isGlobal={isGlobal} />
      <Toolbar isGlobal={isGlobal} />
      {items.map((item) => (
        <RepositoryListItem key={item.uuid} collapsed={collapsed} item={item} onToggle={onToggle} />
      ))}
    </div>
  )
}

export default RepositoryList
