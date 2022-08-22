import React from 'react'

import { ActivityLog } from '@meta/assessment'

type Props = {
  activityLog: ActivityLog<any>
}

const RecentActivityItem: React.FC<Props> = ({ activityLog }) => {
  const { user } = activityLog

  return (
    <div className="landing__activity-item">
      <div className="landing__activity-name">{user.name}</div>
    </div>
  )
}

export default RecentActivityItem
