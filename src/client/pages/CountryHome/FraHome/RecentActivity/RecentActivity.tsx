import React, { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog } from 'meta/assessment'

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
  const { countryIso } = useCountryRouteParams()
  const params = { countryIso }
  const path = ApiEndPoint.CycleData.activities()

  // TODO: No data show empty state:

  // return
  //       <div className="landing__activity-empty">
  //         <img src="/img/tucan.svg" height="72" alt="tucan" />
  //         <p className="landing__activity-empty-title">{t('landing.recentActivity.noRecentActivityTitle')}</p>
  //         <p>{t('landing.recentActivity.noRecentActivityBody')}</p>
  //         <Link
  //           className="btn-s btn-primary"
  //           to={Routes.Country.generatePath({ countryIso, assessmentName, cycleName })}
  //         >
  //           {t('landing.recentActivity.getStarted')}
  //         </Link>
  //       </div>

  return <TablePaginated header={false} columns={columns} path={path} params={params} />
}

export default RecentActivity
