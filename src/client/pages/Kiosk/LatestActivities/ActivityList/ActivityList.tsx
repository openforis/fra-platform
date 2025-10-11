import './ActivityList.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { Activity } from 'meta/kiosk'

import ActivityListItem from 'client/pages/Kiosk/LatestActivities/ActivityListItem'

type Props = {
  activities: Array<Activity> | undefined
  expandedActivity: string | null
  handleExpand: (activity: Activity, map: google.maps.Map) => void
  map: google.maps.Map
}

const ActivityList: React.FC<Props> = (props: Props) => {
  const { activities, expandedActivity, handleExpand, map } = props
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(true)

  const toggleList = useCallback<() => void>(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }, [])

  return (
    <div className="kiosk-latest-activities__list">
      <button
        aria-expanded={isOpen}
        className={classNames('kiosk-latest-activities__map-button', { 'is-open': isOpen })}
        onClick={toggleList}
        type="button"
      >
        <h1>{t('kiosk.latestEvents')}</h1>
      </button>
      <div
        aria-hidden={!isOpen}
        className={classNames('kiosk-latest-activities__list-wrapper', { 'is-open': isOpen })}
        id="kiosk-latest-activities__items"
      >
        <div className="kiosk-latest-activities__list-container">
          {activities?.map((activity) => (
            <ActivityListItem
              key={activity.startDate}
              activity={activity}
              expanded={expandedActivity === activity.id}
              handleExpand={handleExpand}
              map={map}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ActivityList
