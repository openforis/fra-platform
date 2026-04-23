import './ColumnHeaders.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import ButtonExpandCollapse from 'client/components/RepositoryList/Header/ButtonExpandCollapse'
import OrderBy from 'client/components/TablePaginated/Header/OrderBy'
import { Column } from 'client/components/TablePaginated/types'

import { useRepositoryListContext } from '../context'

// Placeholder component
const EmptyComponent = (): null => null

const ColumnHeaders: React.FC = () => {
  const { t } = useTranslation()
  const { allowSorting, isGlobal, selectable, showColumns } = useRepositoryListContext()
  const path = `${ApiEndPoint.CycleData.Repository.many()}?global=${isGlobal}`

  const col = (orderByProperty: string): Column<object> => ({
    key: orderByProperty,
    orderByProperty,
    component: EmptyComponent,
  })

  return (
    <div className="repository-column-headers">
      <div className="repository-column-headers__col">
        <ButtonExpandCollapse />
      </div>
      <div className="repository-column-headers__col repository-column-headers__col--name">
        {t('common.name')}
        {allowSorting && <OrderBy column={col('name')} path={path} />}
      </div>
      {showColumns && (
        <div className="repository-column-headers__col">
          {t('common.added')}
          {allowSorting && <OrderBy column={col('createdAt')} path={path} />}
        </div>
      )}
      {showColumns && !selectable && (
        <div className="repository-column-headers__col">
          {t('common.linked')}
          {allowSorting && <OrderBy column={col('linked')} path={path} />}
        </div>
      )}
      {showColumns && !selectable && (
        <div className="repository-column-headers__col">
          {t('common.access')}
          {allowSorting && <OrderBy column={col('access')} path={path} />}
        </div>
      )}
      <div />
    </div>
  )
}

export default ColumnHeaders
