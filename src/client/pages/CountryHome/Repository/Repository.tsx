import './Repository.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useRepositoryItemChangeListener } from 'client/store/ui/repository'
import TablePaginated from 'client/components/TablePaginated'
import ButtonAdd from 'client/pages/CountryHome/Repository/ButtonAdd'
import EditForm from 'client/pages/CountryHome/Repository/EditForm'

import { useColumns } from './hooks/useColumns'

const Repository: React.FC = () => {
  const { t } = useTranslation()
  const columns = useColumns()
  useRepositoryItemChangeListener()

  return (
    <div className="repository">
      <h3 className="repository__header">{t('landing.links.links')}</h3>
      <TablePaginated
        columns={columns}
        counter={false}
        header={false}
        path={`${ApiEndPoint.CycleData.Repository.many()}?global=true`}
      />
      <ButtonAdd isGlobal />

      <h3 className="repository__header">{t('landing.links.repository')}</h3>
      <TablePaginated columns={columns} counter={false} header={false} path={ApiEndPoint.CycleData.Repository.many()} />
      <ButtonAdd />
      <EditForm />
    </div>
  )
}

export default Repository
