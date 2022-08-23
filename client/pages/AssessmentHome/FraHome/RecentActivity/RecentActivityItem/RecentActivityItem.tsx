import './RecentActivityItem.scss'
import React from 'react'

import { ApiEndPoint } from '@common/api/endpoint'

import { ActivityLog } from '@meta/assessment'

type Props = {
  activityLog: ActivityLog<any>
}

const RecentActivityItem: React.FC<Props> = ({ activityLog }) => {
  const { user } = activityLog

  return (
    <div className="landing__activity-item">
      <img
        className="landing__activity-avatar"
        src={ApiEndPoint.User.getProfilePicture(String(user.id))}
        alt={user.name}
      />
      <div className="landing__activity-name">
        <strong>{user.name}</strong>
      </div>
    </div>
  )
}

export default RecentActivityItem
