import './Repository.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useRepositoryItemChangeListener } from 'client/store/repository/hooks/useRepositoryItemChangeListener'
import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import Hr from 'client/components/Hr'
import EditForm from 'client/pages/CountryHome/Repository/EditForm'
import RepositoryList from 'client/pages/CountryHome/Repository/RepositoryList'

const Repository: React.FC = () => {
  const { t } = useTranslation()
  const isPanEuropean = useIsPanEuropeanRoute()

  useRepositoryItemChangeListener()

  return (
    <div className="repository">
      {!isPanEuropean && (
        <>
          <h3>{t('landing.links.links')}</h3>

          <RepositoryList isGlobal />
          <Hr />
        </>
      )}

      <h3>{t('landing.links.repository')}</h3>
      <RepositoryList />

      <EditForm />
    </div>
  )
}

export default Repository
