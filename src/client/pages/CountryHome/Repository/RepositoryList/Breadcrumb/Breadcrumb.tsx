import './Breadcrumb.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useRepositoryListContext } from '../context'

const Breadcrumb: React.FC = () => {
  const { folderPath, onNavigate } = useRepositoryListContext()
  const { t } = useTranslation()

  return (
    <div className="repository-list__breadcrumb">
      <button onClick={() => onNavigate(null)}>{t('landing.home')}</button>
      {folderPath.map((folder) => (
        <React.Fragment key={folder.uuid}>
          {' / '}
          <button onClick={() => onNavigate(folder.uuid)}>{folder.folderName}</button>
        </React.Fragment>
      ))}
    </div>
  )
}

export default Breadcrumb
