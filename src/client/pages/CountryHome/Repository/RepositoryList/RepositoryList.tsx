import React from 'react'

import { useItems } from 'client/pages/CountryHome/Repository/RepositoryList/hooks/useItems'
import RepositoryListItem from 'client/pages/CountryHome/Repository/RepositoryList/RepositoryListItem'

type Props = {
  isGlobal?: boolean
}

const RepositoryList: React.FC<Props> = (props) => {
  const { isGlobal } = props
  const items = useItems(isGlobal)

  return items.map((item) => <RepositoryListItem key={item.uuid} item={item} />)
}

export default RepositoryList
