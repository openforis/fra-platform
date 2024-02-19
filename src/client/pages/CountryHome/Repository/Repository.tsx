import './Repository.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useRepositoryItemChangeListener } from 'client/store/ui/repository'
import Icon from 'client/components/Icon'
import TablePaginated from 'client/components/TablePaginated'
import EditForm from 'client/pages/CountryHome/Repository/EditForm'

import { useColumns } from './hooks/useColumns'
import { useOpenPanel } from './hooks/useOpenPanel'

const Repository: React.FC = () => {
  const { t } = useTranslation()
  const columns = useColumns()
  const openPanel = useOpenPanel()
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

      <h3 className="repository__header">{t('landing.links.repository')}</h3>
      <TablePaginated columns={columns} counter={false} header={false} path={ApiEndPoint.CycleData.Repository.many()} />

      <button className="btn-s btn-primary" onClick={openPanel} type="button">
        <Icon className="icon-sub icon-white" name="small-add" />
        {t('common.add')}
      </button>

      <EditForm />
    </div>
  )
}

export default Repository
