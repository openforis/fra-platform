import './Repository.scss'
import React from 'react'

import { useRepositoryItemChangeListener } from 'client/store/repository/hooks/useRepositoryItemChangeListener'
import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import Hr from 'client/components/Hr'
import EditForm from 'client/pages/CountryHome/Repository/EditForm'
import RepositoryList from 'client/pages/CountryHome/Repository/RepositoryList'

const Repository: React.FC = () => {
  const isPanEuropean = useIsPanEuropeanRoute()

  useRepositoryItemChangeListener()

  return (
    <div className="repository">
      {!isPanEuropean && (
        <>
          <RepositoryList isGlobal />
          <Hr />
        </>
      )}

      <RepositoryList />

      <EditForm />
    </div>
  )
}

export default Repository
