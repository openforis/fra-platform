import './Item.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLogs } from 'meta/assessment'
import { Users } from 'meta/user'

import { useOnClick } from './hooks/useOnClick'
import { Props } from './props'

const formatDate = (date?: string): string => (date ? Dates.format(Dates.parseISO(date), 'dd MMMM yyyy HH:mm') : '')

const Item: React.FC<Props> = (props) => {
  const { t } = useTranslation()
  const { datum: activity } = props
  const { user } = activity

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onClick = useOnClick(props)

  return (
    <button className="nav-section__item history-item" onClick={onClick} type="button">
      <div className="nav-section__order">
        <img
          alt={Users.getFullName(user)}
          className="history-item__avatar"
          src={ApiEndPoint.User.profilePicture(String(user.id))}
        />
      </div>
      <div className="nav-section__label">
        <strong>{Users.getFullName(user)}</strong>
        <span>{ActivityLogs.getLabelAction({ activity, t })}</span>
        <span>{formatDate(activity.time)}</span>
      </div>
    </button>
  )
}

export default Item
