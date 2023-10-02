import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useTablePaginatedCount } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import TablePaginated, { Column } from 'client/components/TablePaginated'

import RecentActivityItem from './RecentActivityItem/RecentActivityItem'

const useColumns = (): Array<Column<ActivityLog<any>>> => {
  return useMemo<Array<Column<ActivityLog<any>>>>(
    () => [
      {
        component: ({ datum }) => <RecentActivityItem activity={datum} />,
        key: 'activity-log',
      },
    ],
    []
  )
}

const RecentActivity: React.FC = () => {
  const columns = useColumns()
  const { t } = useTranslation()

  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const params = useMemo(
    () => ({
      countryIso,
    }),
    [countryIso]
  )
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

  return <TablePaginated header={false} columns={columns} path={path} params={params} />
}

export default RecentActivity
