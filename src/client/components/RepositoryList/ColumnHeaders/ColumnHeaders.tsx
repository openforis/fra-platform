import './ColumnHeaders.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'

import ButtonExpandCollapse from 'client/components/RepositoryList/Header/ButtonExpandCollapse'
import OrderBy from 'client/components/TablePaginated/Header/OrderBy'
import { Column } from 'client/components/TablePaginated/types'

// Placeholder component
const EmptyComponent = (): null => null

type Props = {
  isGlobal?: boolean
}

const ColumnHeaders: React.FC<Props> = (props) => {
  const { isGlobal = false } = props
  const { t } = useTranslation()
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
        <OrderBy column={col('name')} path={path} />
      </div>
      <div className="repository-column-headers__col">
        {t('common.added')}
        <OrderBy column={col('createdAt')} path={path} />
      </div>
      <div className="repository-column-headers__col">
        {t('common.linked')}
        <OrderBy column={col('linked')} path={path} />
      </div>
      <div className="repository-column-headers__col">
        {t('common.access')}
        <OrderBy column={col('access')} path={path} />
      </div>
      <div />
    </div>
  )
}

export default ColumnHeaders
