import React, { useEffect, useRef } from 'react'

import { ApiEndPoint } from '@common/api/endpoint'
import { Objects } from '@core/utils'

import { ActivityLog } from '@meta/assessment'

import { useAssessment } from '@client/store/assessment'
import { useCountryIso, useGetRequest } from '@client/hooks'

import RecentActivityItem from './RecentActivityItem/RecentActivityItem'

const RecentActivity: React.FC = () => {
  const countryIso = useCountryIso()
  const assessment = useAssessment()

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
      {!Objects.isEmpty(data) &&
        data.map((activityLog) => {
          return <RecentActivityItem key={activityLog.id} activityLog={activityLog} />
        })}
    </div>
  )
}

export default RecentActivity
