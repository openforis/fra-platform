import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog } from 'meta/assessment'
import { Routes } from 'meta/routes'

import { useGetRequest } from 'client/hooks'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import RecentActivityItem from './RecentActivityItem/RecentActivityItem'

const RecentActivity: React.FC = () => {
  const { t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()

  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.CycleData.activities(), {
    params: { countryIso, assessmentName, cycleName },
  }) as { data: Array<ActivityLog<any>>; dispatch: any }

  const fetchRef = useRef(fetchData)

  useEffect(() => fetchRef.current(), [fetchRef])

  if (!data) return null

  return (
    <div className="landing__page-container">
      {!Objects.isEmpty(data) ? (
        data.map((activity, index) => {
          // eslint-disable-next-line react/no-array-index-key
          return <RecentActivityItem key={String(index)} activity={activity} />
        })
      ) : (
        <div className="landing__activity-empty">
          <img src="/img/tucan.svg" height="72" alt="tucan" />
          <p className="landing__activity-empty-title">{t('landing.recentActivity.noRecentActivityTitle')}</p>
          <p>{t('landing.recentActivity.noRecentActivityBody')}</p>
          <Link
            className="btn-s btn-primary"
            to={Routes.Country.generatePath({ countryIso, assessmentName, cycleName })}
          >
            {t('landing.recentActivity.getStarted')}
          </Link>
        </div>
      )}
    </div>
  )
}

export default RecentActivity
