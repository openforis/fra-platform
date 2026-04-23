import './RepositoryList.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { RepositoryItem, RepositoryItemTree } from 'meta/cycleData/repository/item'

import { DataGrid } from 'client/components/DataGrid'
import Hr from 'client/components/Hr'
import RepositoryListItem from 'client/components/RepositoryList/RepositoryListItem'

import { useFolderNavigation } from './hooks/useFolderNavigation'
import { useGetItems } from './hooks/useGetItems'
import { useItems } from './hooks/useItems'
import { useOnToggle } from './hooks/useOnToggle'
import Breadcrumb from './Breadcrumb'
import ColumnHeaders from './ColumnHeaders'
import { RepositoryListContext } from './context'
import EditForm from './EditForm'
import Header from './Header'
import RepositoryListSkeleton from './RepositoryListSkeleton'

type Props = {
  isGlobal?: boolean
  onSelect?: (item: RepositoryItemTree) => void
  selectedUuids?: Array<string>
}

const RepositoryList: React.FC<Props> = (props) => {
  const { isGlobal, onSelect, selectedUuids = [] } = props
  const { t } = useTranslation()
  const [repositoryItem, setRepositoryItem] = useState<Partial<RepositoryItem> | undefined>()

  useGetItems(isGlobal)
  const { isLoading, items } = useItems(isGlobal)
  const { expanded, onCollapseAll, onExpandAll, onToggle } = useOnToggle()
  const { contextValue, visibleItems } = useFolderNavigation({
    expanded,
    isGlobal,
    items,
    onCollapseAll,
    onExpandAll,
    onOpenPanel: setRepositoryItem,
    onSelect,
    onToggle,
    selectedUuids,
  })

  const title = isGlobal ? t('landing.links.links') : t('landing.links.repository')
  let gridTemplateColumns = '28px 1fr 100px minmax(120px, auto) minmax(120px, auto) auto'
  // Read only/global view
  if (isGlobal) gridTemplateColumns = '28px 1fr'
  // Modal view
  else if (onSelect) gridTemplateColumns = '28px 1fr 100px auto'

  return (
    <RepositoryListContext.Provider value={contextValue}>
      <div className="repository-list__title">
        <span className="repository-list__title-label">{title}</span>
        <Hr vertical />
        <Breadcrumb />
      </div>
      <DataGrid gridTemplateColumns={gridTemplateColumns}>
        <Header isGlobal={isGlobal} />
        <ColumnHeaders isGlobal={isGlobal} />
        {isLoading ? (
          <RepositoryListSkeleton />
        ) : (
          visibleItems.map((item) => <RepositoryListItem key={item.uuid} item={item} />)
        )}
      </DataGrid>
      <EditForm onClose={() => setRepositoryItem(undefined)} repositoryItem={repositoryItem} />
    </RepositoryListContext.Provider>
  )
}

export default RepositoryList
