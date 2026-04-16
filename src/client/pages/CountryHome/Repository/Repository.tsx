import './Repository.scss'
import React, { useState } from 'react'

import { RepositoryItem } from 'meta/cycleData/repository/item'

import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import Hr from 'client/components/Hr'
import RepositoryList from 'client/components/RepositoryList'
import EditForm from 'client/pages/CountryHome/Repository/EditForm'

const Repository: React.FC = () => {
  const isPanEuropean = useIsPanEuropeanRoute()
  const [repositoryItem, setRepositoryItem] = useState<Partial<RepositoryItem> | undefined>()

  return (
    <div className="repository">
      {!isPanEuropean && (
        <>
          <RepositoryList isGlobal onOpenPanel={setRepositoryItem} />
          <Hr />
        </>
      )}

      <RepositoryList onOpenPanel={setRepositoryItem} />

      <EditForm onClose={() => setRepositoryItem(undefined)} repositoryItem={repositoryItem} />
    </div>
  )
}

export default Repository
