import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { DataGrid } from 'client/components/DataGrid'

import ButtonAdd from '../ButtonAdd'
import ButtonDownloadAll from '../ButtonDownloadAll'
import { useItems } from './hooks/useItems'
import RepositoryFolders from './RepositoryFolders'
import RepositoryItems from './RepositoryItems'

const CountryRepository: React.FC = () => {
  const { t } = useTranslation()
  const data = useItems()
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null)

  if (!data) return null

  const { items, tree } = data

  return (
    <>
      <div className="repository__header">
        <h3>{t('landing.links.repository')}</h3>
        <ButtonDownloadAll />
        <ButtonAdd />
      </div>
      <DataGrid gridTemplateColumns="240px 1fr">
        <RepositoryFolders onSelect={setSelectedFolder} selected={selectedFolder} tree={tree} />
        <RepositoryItems items={items} selectedFolder={selectedFolder} />
      </DataGrid>
    </>
  )
}

export default CountryRepository
