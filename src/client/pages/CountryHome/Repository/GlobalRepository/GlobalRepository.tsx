import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useIsPanEuropeanRoute } from 'client/hooks/routes'
import Hr from 'client/components/Hr'
import TablePaginated from 'client/components/TablePaginated'

import ButtonAdd from '../ButtonAdd'
import ButtonDownloadAll from '../ButtonDownloadAll'
import { useColumns } from '../hooks/useColumns'

const GlobalRepository: React.FC = () => {
  const { t } = useTranslation()
  const columns = useColumns()
  const isPanEuropean = useIsPanEuropeanRoute()

  if (isPanEuropean) return null

  return (
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
  )
}

export default GlobalRepository
