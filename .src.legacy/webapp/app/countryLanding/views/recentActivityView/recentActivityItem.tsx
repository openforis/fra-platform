import React from 'react'
import { Link } from 'react-router-dom'

import { FRA } from '@core/assessment'
import * as BasePaths from '@webapp/main/basePaths'
import { getRelativeDate } from '@webapp/utils/relativeDate'

import { useCountryIso, useI18n } from '@webapp/hooks'

import * as FeedItem from './feedItem'

type Props = {
  feedItem: any
}

const RecentActivityItem = (props: Props) => {
  const { feedItem } = props
  const { userId, fullName, sectionName, editTime } = feedItem

  const i18n = useI18n()
  const countryIso = useCountryIso()

  return (
    <div className="landing__activity-item">
      <img className="landing__activity-avatar" alt={fullName} src={BasePaths.getUserProfilePictureLink(userId)} />
      <div className="landing__activity-name">
        <strong>{fullName}</strong>
        <span>{FeedItem.getLabelAction(i18n)(feedItem)}</span>
        {FeedItem.hasSectionLink(feedItem) && (
          <Link
            className={`link${FeedItem.isSectionLinkDisabled(feedItem) ? ' disabled' : ''}`}
            to={BasePaths.getAssessmentSectionLink(countryIso, FRA.type, sectionName)}
          >
            {FeedItem.getLabelSection(i18n)(feedItem)}
          </Link>
        )}
      </div>
      <div className="landing__activity-time">{getRelativeDate(editTime, i18n)}</div>
    </div>
  )
}

export default RecentActivityItem
