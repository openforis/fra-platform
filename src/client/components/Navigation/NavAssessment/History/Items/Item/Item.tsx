import './Item.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'
import { Dates } from 'utils/dates'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLogs } from 'meta/assessment'
import { Users } from 'meta/user'

import { useHistoryCompareItem } from 'client/store/data'
import Button, { ButtonSize, ButtonType } from 'client/components/Buttons/Button'

import { useOnClick } from './hooks/useOnClick'
import { Props } from './props'

const formatDate = (date?: string): string => (date ? Dates.format(Dates.parseISO(date), 'dd MMM yyyy') : '')
const formatTime = (date?: string): string => (date ? Dates.format(Dates.parseISO(date), ' hh:mm:SS a') : '')

const Item: React.FC<Props> = (props) => {
  const { datum: activity, target } = props
  const { user } = activity

  const { t } = useTranslation()
  const compareItem = useHistoryCompareItem(target)
  const onClick = useOnClick(props)

  const diffActive = compareItem?.id === activity.id
  const label = `${user.props.name.at(0)}. ${user.props.surname} ${ActivityLogs.getLabelAction({ activity, t })}`

  return (
    <>
      <div className="history-item__timestamp">
        <div>{formatDate(activity.time)}</div>
        <div>{formatTime(activity.time)}</div>
      </div>

      <div className="history-item__separator">
        <div className="marker">
          <div />
        </div>
      </div>

      <div className={classNames('history-item__content', { diffActive })}>
        <img
          alt={Users.getFullName(user)}
          className="history-item__avatar"
          src={ApiEndPoint.User.profilePicture(String(user.id))}
        />
        <div>{label}</div>
        <Button
          iconName="compare_arrows"
          inverse={!diffActive}
          label={t('common.compare')}
          onClick={onClick}
          size={ButtonSize.xs}
          type={ButtonType.black}
        />
      </div>
    </>
  )
}

export default Item
