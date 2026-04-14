import './RepositoryList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import Hr from 'client/components/Hr'
import RepositoryListItem from 'client/pages/CountryHome/Repository/RepositoryList/RepositoryListItem'

import { useFolderNavigation } from './hooks/useFolderNavigation'
import { useGetItems } from './hooks/useGetItems'
import { useItems } from './hooks/useItems'
import { useOnToggle } from './hooks/useOnToggle'
import Breadcrumb from './Breadcrumb'
import ColumnHeaders from './ColumnHeaders'
import { RepositoryListContext } from './context'
import Header from './Header'

type Props = {
  isGlobal?: boolean
}

const RepositoryList: React.FC<Props> = (props) => {
  const { isGlobal } = props
  const { t } = useTranslation()

  useGetItems(isGlobal)
  const items = useItems(isGlobal)
  const { collapsed, onToggle } = useOnToggle()
  const { contextValue, visibleItems } = useFolderNavigation({ collapsed, items, onToggle })

  const title = isGlobal ? t('landing.links.links') : t('landing.links.repository')

  return (
    <RepositoryListContext.Provider value={contextValue}>
      <div className="repository-list__title">
        <span className="repository-list__title-label">{title}</span>
        <Hr vertical />
        <Breadcrumb />
      </div>
      <div className="repository-list">
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
