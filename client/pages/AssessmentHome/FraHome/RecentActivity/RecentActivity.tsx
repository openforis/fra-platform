import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ApiEndPoint } from '@common/api/endpoint'
import { Objects } from '@core/utils'

import { ActivityLog } from '@meta/assessment'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso, useGetRequest } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'

import RecentActivityItem from './RecentActivityItem/RecentActivityItem'

const RecentActivity: React.FC = () => {
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const i18n = useTranslation()

  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.Assessment.activityLog(countryIso), {
    params: {
      assessmentName: assessment.props.name,
    },
  }) as { data: Array<ActivityLog<any>>; dispatch: any }

  const fetchRef = useRef(fetchData)

  useEffect(() => fetchRef.current(), [fetchRef])

  if (!data) return null

  return (
    <div className="landing__page-container">
      {!Objects.isEmpty(data) ? (
        data.map((activityLog) => {
          return <RecentActivityItem key={activityLog.id} activityLog={activityLog} />
        })
      ) : (
        <div className="landing__activity-empty">
          <img src="/img/tucan.svg" height="72" alt="tucan" />
          <p className="landing__activity-empty-title">{i18n.t('landing.recentActivity.noRecentActivityTitle')}</p>
          <p>{i18n.t('landing.recentActivity.noRecentActivityBody')}</p>
          <Link
            className="btn-s btn-primary"
            to={ClientRoutes.Assessment.Root.getLink({
              countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
            })}
          >
            {i18n.t('landing.recentActivity.getStarted')}
          </Link>
        </div>
      )}
    </div>
  )
}

export default RecentActivity
