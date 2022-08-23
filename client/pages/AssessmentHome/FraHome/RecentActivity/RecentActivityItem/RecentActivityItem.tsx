import './RecentActivityItem.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from '@common/api/endpoint'

import { ActivityLog } from '@meta/assessment'

import { Dates } from '@client/utils'

type Props = {
  activityLog: ActivityLog<any>
}

const RecentActivityItem: React.FC<Props> = ({ activityLog }) => {
  const { user } = activityLog
  const { i18n } = useTranslation()

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
      <div className="landing__activity-time">{Dates.getRelativeDate(activityLog.time, i18n)}</div>
    </div>
  )
}

export default RecentActivityItem
