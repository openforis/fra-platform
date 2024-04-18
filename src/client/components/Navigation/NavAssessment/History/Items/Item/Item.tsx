import './Item.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Dates } from 'utils/dates'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLogs } from 'meta/assessment'
import { Users } from 'meta/user'

import { useHistoryCompareItem } from 'client/store/data'
import Icon from 'client/components/Icon'

import { useOnClick } from './hooks/useOnClick'
import { Props } from './props'

const Item: React.FC<Props> = (props) => {
  const { datum: activity, target } = props
  const { user } = activity

  const { i18n, t } = useTranslation()
  const compareItem = useHistoryCompareItem(target)
  const onClick = useOnClick(props)

  const diffActive = compareItem?.id === activity.id

  return (
    <>
      <div className="history-item__separator">
        <div className="marker">
          <div />
        </div>
      </div>

      <button className={classNames('history-item__content', { diffActive })} onClick={onClick} type="button">
        <img
          alt={Users.getFullName(user)}
          className="history-item__avatar"
          src={ApiEndPoint.User.profilePicture(String(user.id))}
        />

        <div className="history-item__content-text">
          <div className="history-item__timestamp">{Dates.getRelativeDate(activity.time, i18n)}</div>
          <div>
            {user.props.name.at(0)}. {user.props.surname} {ActivityLogs.getLabelAction({ activity, t })}
          </div>
        </div>

        <Icon name="compare_arrows" />
      </button>
    </>
  )
}

export default Item
