import React from 'react'

import { useItems } from 'client/pages/CountryHome/Repository/RepositoryList/hooks/useItems'
import RepositoryListItem from 'client/pages/CountryHome/Repository/RepositoryList/RepositoryListItem'

import { useOnToggle } from './hooks/useOnToggle'
type Props = {
  isGlobal?: boolean
}

const RepositoryList: React.FC<Props> = (props) => {
  const { isGlobal } = props
  const items = useItems(isGlobal)
  const { collapsed, onToggle } = useOnToggle()

  return items.map((item) => (
    <RepositoryListItem key={item.uuid} collapsed={collapsed} item={item} onToggle={onToggle} />
  ))
}

export default RepositoryList
