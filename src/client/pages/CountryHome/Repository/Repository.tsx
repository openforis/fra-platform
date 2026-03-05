import './Repository.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useRepositoryItemChangeListener } from 'client/store/repository/hooks/useRepositoryItemChangeListener'
import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import Hr from 'client/components/Hr'
import TablePaginated from 'client/components/TablePaginated'
import ButtonAdd from 'client/pages/CountryHome/Repository/ButtonAdd'
import ButtonDownloadAll from 'client/pages/CountryHome/Repository/ButtonDownloadAll'
import EditForm from 'client/pages/CountryHome/Repository/EditForm'

import { useColumns } from './hooks/useColumns'
import { useCompareFn } from './hooks/useCompareFn'
import { useGroups } from './hooks/useGroups'

const Repository: React.FC = () => {
  const { t } = useTranslation()
  const columns = useColumns()
  const compareFn = useCompareFn()
  const groups = useGroups()
  const isPanEuropean = useIsPanEuropeanRoute()

  useRepositoryItemChangeListener()

  return (
    <div className="repository">
      {!isPanEuropean && (
        <>
          <div className="repository__header">
            <h3>{t('landing.links.links')}</h3>
            <ButtonDownloadAll isGlobal />
            <ButtonAdd isGlobal />
          </div>
          <TablePaginated
            columns={columns}
            counter={{ show: false }}
            header={false}
            path={`${ApiEndPoint.CycleData.Repository.many()}?global=true`}
          />

          <Hr />
        </>
      )}

      <div className="repository__header">
        <h3>{t('landing.links.repository')}</h3>
        <ButtonDownloadAll />
        <ButtonAdd />
      </div>
      <TablePaginated
        columns={columns}
        compareFn={compareFn}
        counter={{ show: false }}
        groups={groups}
        header={false}
        path={ApiEndPoint.CycleData.Repository.many()}
      />

      <EditForm />
    </div>
  )
}

export default Repository
