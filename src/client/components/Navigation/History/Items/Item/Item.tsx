import './Item.scss'
import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'
import { ActivityLog, ActivityLogs, CommentableDescriptionValue } from 'meta/assessment'
import { Histories, HistoryItemSectionKey } from 'meta/cycleData'
import { Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { DataActions } from 'client/store/data'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

type Props = {
  datum: ActivityLog<never>
  sectionItemKey: HistoryItemSectionKey
}

const _getValue = (activity: ActivityLog<unknown>): CommentableDescriptionValue => {
  return (activity as ActivityLog<{ description: { value: CommentableDescriptionValue } }>).target.description.value
}

const useOnClick = () => {
  const { assessmentName, cycleName, countryIso } = useSectionRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  const onClick = (activity: ActivityLog<never>, sectionItemKey: HistoryItemSectionKey): void => {
    const { sectionName, subSection, name } = Histories.getHistoryItemKeyParts(sectionItemKey)

    const value = _getValue(activity)

    dispatch(
      DataActions.setValue({
        assessmentName,
        cycleName,
        countryIso,
        subSection,
        name,
        sectionName,
        value,
      })
    )
  }

  return useCallback(onClick, [assessmentName, countryIso, cycleName, dispatch])
}

const Item: React.FC<Props> = (props: Props) => {
  const { datum: activity, sectionItemKey } = props
  const { user } = activity
  const { i18n, t } = useTranslation()

  const onClick = useOnClick()

  // When user is not defined, we are dealing with the current state
  if (!user)
    return (
      <button className="history-item" onClick={() => onClick(activity, sectionItemKey)} type="button">
        <img alt="tucan" className="landing__activity-avatar" src="/img/tucan.svg" />
        <div className="landing__activity-name">
          <strong>Current</strong>
          <span>{activity.time}</span>
        </div>

        <div className="landing__activity-time">{Dates.getRelativeDate(activity.time, i18n)}</div>
      </button>
    )

  return (
    <button className="history-item" onClick={() => onClick(activity, sectionItemKey)} type="button">
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
