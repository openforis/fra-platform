import './Repository.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'
import EditForm from 'client/pages/CountryHome/Repository/EditForm'
import { useColumns } from 'client/pages/CountryHome/Repository/hooks/useColumns'

const Repository: React.FC = () => {
  const { t } = useTranslation()
  const columns = useColumns()

  return (
    <div className="repository">
      <h3 className="repository__header">{t('landing.links.links')}</h3>
      <TablePaginated
        header={false}
        counter={false}
        columns={columns}
        path={`${ApiEndPoint.CycleData.Repository.many()}?global=true`}
      />

      <h3 className="repository__header">{t('landing.links.repository')}</h3>
      <TablePaginated header={false} counter={false} columns={columns} path={ApiEndPoint.CycleData.Repository.many()} />

      <EditForm />
    </div>
  )
}

export default Repository
