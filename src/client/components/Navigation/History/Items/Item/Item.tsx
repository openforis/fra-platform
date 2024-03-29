import './Item.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog, ActivityLogs } from 'meta/assessment'
import { Users } from 'meta/user'

type Props = {
  datum: ActivityLog<never>
  onClick: (activityLog: ActivityLog<never>) => void
}

const Item: React.FC<Props> = (props: Props) => {
  const { datum: activity, onClick } = props
  const { user } = activity
  const { i18n, t } = useTranslation()

  // When user is not defined, we are dealing with the current state
  if (!user)
    return (
      <button className="history-item" onClick={() => onClick(activity)} type="button">
        <img className="landing__activity-avatar" src="/img/tucan.svg" />
        <div className="landing__activity-name">
          <strong>Current</strong>
          <span>{activity.time}</span>
        </div>

        <div className="landing__activity-time">{Dates.getRelativeDate(activity.time, i18n)}</div>
      </button>
    )

  return (
    <button className="history-item" onClick={() => onClick(activity)} type="button">
      <img
        alt={Users.getFullName(user)}
        className="landing__activity-avatar"
        src={ApiEndPoint.User.profilePicture(String(user.id))}
      />
      <div className="landing__activity-name">
        <strong>{Users.getFullName(user)}</strong>
        <span>{ActivityLogs.getLabelAction({ activity, t })}</span>
        <span>{activity.time}</span>
      </div>

      <div className="landing__activity-time">{Dates.getRelativeDate(activity.time, i18n)}</div>
    </button>
  )
}

export default Item
