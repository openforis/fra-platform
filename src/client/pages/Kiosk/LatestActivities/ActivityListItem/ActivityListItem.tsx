import './ActivityListItem.scss'
import React from 'react'

import classNames from 'classnames'

import Button, { ButtonType } from 'client/components/Buttons/Button'
import { Activity } from 'client/pages/Kiosk/LatestActivities/types'

type Props = {
  activity: Activity
  expanded: boolean
  handleExpand: (activity: Activity, map: google.maps.Map) => void
  map: google.maps.Map
}

const _getActivityLabel = (date: string, countryName: string): string => {
  const parsedDate = new Date(date)
  const month = parsedDate.toLocaleString('en-US', { month: 'long' })
  const year = parsedDate.getFullYear()
  return `${month} ${year} - ${countryName}`
}

const ActivityListItem: React.FC<Props> = (props: Props) => {
  const { activity, expanded, handleExpand, map } = props

  return (
    <div className={classNames('kiosk-latest-activities__list-item', { expanded })}>
      <div className="kiosk-latest-activities__list-item-header">
        <Button
          className="kiosk-latest-activities__list-item-button"
          inverse={!expanded}
          label={_getActivityLabel(activity.date, activity.countryName)}
          onClick={() => {
            handleExpand(activity, map)
          }}
          type={ButtonType.black}
        />
      </div>
      <div className={classNames(`kiosk-latest-activities__list-item-content`, { expanded })}>
        {expanded && <div>{activity.description}</div>}
      </div>
    </div>
  )
}

export default ActivityListItem
