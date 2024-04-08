import './Item.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLogs } from 'meta/assessment'
import { Users } from 'meta/user'

import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { useOnClick } from './hooks/useOnClick'
import { Props } from './props'

const formatDate = (date?: string): string => (date ? Dates.format(Dates.parseISO(date), 'dd MMM yyyy hh:mm a') : '')

const Item: React.FC<Props> = (props) => {
  const { datum: activity } = props
  const { user } = activity

  const { t } = useTranslation()
  const onClick = useOnClick(props)

  const label = `${user.props.name.at(0)}. ${user.props.surname} ${ActivityLogs.getLabelAction({ activity, t })}`

  return (
    <>
      <div className="history-item__timestamp">{formatDate(activity.time)}</div>

      <div className="history-item__separator">
        <div className="marker">
          <div />
        </div>
      </div>

      <div className="history-item__content">
        <Button
          icon={
            <img
              alt={Users.getFullName(user)}
              className="history-item__avatar"
              src={ApiEndPoint.User.profilePicture(String(user.id))}
            />
          }
          inverse
          label={label}
          onClick={onClick}
          size={ButtonSize.xs}
          type={ButtonType.blackMap}
        />
      </div>
    </>
  )
}

export default Item
