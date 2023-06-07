import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ClientRoutes } from 'meta/app'
import { ActivityLog } from 'meta/assessment'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso, useGetRequest } from 'client/hooks'

import RecentActivityItem from './RecentActivityItem/RecentActivityItem'

const RecentActivity: React.FC = () => {
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const i18n = useTranslation()

  const { data, dispatch: fetchData } = useGetRequest(ApiEndPoint.CycleData.activities(), {
    params: { countryIso, assessmentName: assessment.props.name, cycleName: cycle.name },
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
          <p className="landing__activity-empty-title">{i18n.t('landing.recentActivity.noRecentActivityTitle')}</p>
          <p>{i18n.t('landing.recentActivity.noRecentActivityBody')}</p>
          <Link
            className="btn-s btn-primary"
            to={ClientRoutes.Assessment.Cycle.Country.Landing.getLink({
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
