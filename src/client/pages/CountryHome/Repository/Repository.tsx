import './Repository.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'
import CreateFile from 'client/pages/CountryHome/Repository/CreateFile'
import { useColumns } from 'client/pages/CountryHome/Repository/hooks/useColumns'

const Repository: React.FC = () => {
  const { t } = useTranslation()
  const columns = useColumns()

  return (
    <div className="landing__page-repository">
      <div className="landing__page-container-header landing__repository-header">
        <h3>{t('landing.links.links')}</h3>
      </div>

      <div className="table-container">
        <TablePaginated
          header={false}
          counter={false}
          columns={columns}
          path={ApiEndPoint.CycleData.Repository.links()}
        />
      </div>
      <div />

      <div className="landing__page-container-header">
        <h3>{t('landing.links.repository')}</h3>
      </div>

      <div className="table-container">
        <TablePaginated
          header={false}
          counter={false}
          columns={columns}
          path={ApiEndPoint.CycleData.Repository.files()}
        />
      </div>

      <div className="landing__page-button-container">
        <CreateFile />
      </div>
    </div>
  )
}

export default Repository
