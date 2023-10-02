import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Routes } from 'meta/routes'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import TablePaginated from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'
import { limit } from './limit'

const RecentActivity: React.FC = () => {
  const columns = useColumns()
  const { t } = useTranslation()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const path = ApiEndPoint.CycleData.activities()

  const count = useTablePaginatedCount(path)

  if (!Objects.isEmpty(count) && count.total === 0) {
    return (
      <div className="landing__activity-empty">
        <img src="/img/tucan.svg" height="72" alt="tucan" />
        <p className="landing__activity-empty-title">{t('landing.recentActivity.noRecentActivityTitle')}</p>
        <p>{t('landing.recentActivity.noRecentActivityBody')}</p>
        <Link className="btn-s btn-primary" to={Routes.Country.generatePath({ countryIso, assessmentName, cycleName })}>
          {t('landing.recentActivity.getStarted')}
        </Link>
      </div>
    )
  }

  return <TablePaginated header={false} limit={limit} columns={columns} path={path} />
}

export default RecentActivity
