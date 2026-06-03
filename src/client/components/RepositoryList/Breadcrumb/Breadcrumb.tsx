import './Breadcrumb.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useRepositoryListContext } from 'client/components/RepositoryList/context'

const Breadcrumb: React.FC = () => {
  const { folderPath, onNavigate } = useRepositoryListContext()
  const { t } = useTranslation()

  return (
    <span className="repository-header__path">
      <button onClick={() => onNavigate()}>{t('landing.home')}</button>
      {folderPath.map((folder) => (
        <React.Fragment key={folder.uuid}>
          {' / '}
          <button onClick={() => onNavigate(folder.uuid)}>{folder.folderName}</button>
        </React.Fragment>
      ))}
    </span>
  )
}

export default Breadcrumb
