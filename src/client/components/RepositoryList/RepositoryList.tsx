import './RepositoryList.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area/areas'
import { RepositoryItem, RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useCountryIso } from 'client/hooks/country'
import { DataGrid } from 'client/components/DataGrid'
import Hr from 'client/components/Hr'
import RepositoryListItem from 'client/components/RepositoryList/RepositoryListItem'

import { useFolderNavigation } from './hooks/useFolderNavigation'
import { useGetItems } from './hooks/useGetItems'
import { useItems } from './hooks/useItems'
import { useOnToggle } from './hooks/useOnToggle'
import { useReset } from './hooks/useReset'
import Breadcrumb from './Breadcrumb'
import ColumnHeaders from './ColumnHeaders'
import { RepositoryListContext } from './context'
import EditForm from './EditForm'
import Header from './Header'
import RepositoryListSkeleton from './RepositoryListSkeleton'

type Props = {
  allowEditing?: boolean
  allowFiltering?: boolean
  allowSorting?: boolean
  isGlobal?: boolean
  onSelect?: (item: RepositoryItemTree) => void
  selectedUuids?: Array<string>
  showColumns?: boolean
  showCountryName?: boolean
}

const RepositoryList: React.FC<Props> = (props) => {
  const {
    allowEditing = true,
    allowFiltering = true,
    allowSorting = true,
    isGlobal = false,
    onSelect,
    selectedUuids = [],
    showColumns = true,
    showCountryName = false,
  } = props
  const { t } = useTranslation()
  const countryIso = useCountryIso()
  const [repositoryItem, setRepositoryItem] = useState<Partial<RepositoryItem> | undefined>()

  useGetItems(isGlobal)
  const { isLoading, items } = useItems(isGlobal)
  const { expanded, onCollapseAll, onExpandAll, onToggle } = useOnToggle()
  const { contextValue, visibleItems } = useFolderNavigation({
    allowEditing,
    allowFiltering,
    allowSorting,
    expanded,
    isGlobal,
    items,
    onCollapseAll,
    onExpandAll,
    onOpenPanel: setRepositoryItem,
    onSelect,
    onToggle,
    selectedUuids,
    showColumns,
  })

  useReset(isGlobal)

  const countryName = t(Areas.getTranslationKey(countryIso))
  let title = t('landing.links.repository')
  if (isGlobal) title = t('landing.links.links')
  else if (showCountryName) title = t('landing.links.countryRepository', { countryName })
  let gridTemplateColumns = '28px 1fr minmax(120px, max-content) minmax(120px, auto) minmax(120px, auto) auto'
  if (!showColumns) gridTemplateColumns = '28px 1fr'
  else if (onSelect) gridTemplateColumns = '28px 1fr minmax(120px, max-content) auto'

  return (
    <RepositoryListContext.Provider value={contextValue}>
      <div className="repository-list__title">
        <span className="repository-list__title-label">{title}</span>
        <Hr vertical />
        <Breadcrumb />
      </div>
      <DataGrid gridTemplateColumns={gridTemplateColumns}>
        <Header />
        <ColumnHeaders />
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
