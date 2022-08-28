import './RecentActivityItem.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { ApiEndPoint } from '@meta/api/endpoint'

import { ActivityLog, ActivityLogs } from '@meta/assessment'

import { useAssessment, useCycle } from '@client/store/assessment'
import { useCountryIso } from '@client/hooks'
import { ClientRoutes } from '@client/clientRoutes'
import { Dates } from '@client/utils'
import classNames from 'classnames'

type Props = {
  activity: ActivityLog<any>
}

const RecentActivityItem: React.FC<Props> = ({ activity }) => {
  const { user, section } = activity

  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
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
        <span>{ActivityLogs.getLabelAction(activity, i18n)}</span>
        {ActivityLogs.hasSectionLink(activity) && (
          <Link
            className={classNames('link', { disabled: ActivityLogs.isSectionLinkDisabled(activity) })}
            to={ClientRoutes.Assessment.Section.getLink({
              countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              section,
            })}
          >
            {ActivityLogs.getLabelSection(activity, i18n)}
          </Link>
        )}
      </div>
      <div className="landing__activity-time">{Dates.getRelativeDate(activity.time, i18n)}</div>
    </div>
  )
}

export default RecentActivityItem
