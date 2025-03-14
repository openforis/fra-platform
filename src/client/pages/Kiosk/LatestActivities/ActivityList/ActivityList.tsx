import './ActivityList.scss'
import React from 'react'

import { Activity } from 'meta/kiosk'

import ActivityListItem from 'client/pages/Kiosk/LatestActivities/ActivityListItem'

type Props = {
  activities: Array<Activity> | undefined
  expandedActivity: string | null
  handleExpand: (activity: Activity, map: google.maps.Map) => void
  map: google.maps.Map
}

const ActivityList: React.FC<Props> = (props: Props) => {
  const { activities, expandedActivity, handleExpand, map } = props

  return (
    <div className="kiosk-latest-activities__list">
      <div className="kiosk-latest-activities__list-title-container">
        <h1>Latest Activities</h1>
      </div>
      <div className="kiosk-latest-activities__list-container">
        {activities?.map((activity) => (
          <ActivityListItem
            key={activity.startDate}
            activity={activity}
            expanded={expandedActivity === activity.id}
            handleExpand={handleExpand}
            map={map}
          />
        ))}
      </div>
    </div>
  )
}

export default ActivityList
