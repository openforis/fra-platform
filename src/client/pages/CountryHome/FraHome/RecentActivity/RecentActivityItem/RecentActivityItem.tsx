import './RecentActivityItem.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog, ActivityLogs } from 'meta/assessment'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useCountryIso } from 'client/hooks'
import { ColumnComponentProps } from 'client/components/TablePaginated'
import { Dates } from 'client/utils'

const RecentActivityItem: React.FC<ColumnComponentProps<ActivityLog<never>>> = (props) => {
  const { datum: activity, rowIndex } = props
  const { user, section: sectionName } = activity

  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()
  const { i18n } = useTranslation()

  return (
    <div className={classNames('landing__activity-item', { firstRow: rowIndex === 0 })}>
      <img
        className="landing__activity-avatar"
        src={ApiEndPoint.User.profilePicture(String(user.id))}
        alt={Users.getFullName(user)}
      />
      <div className="landing__activity-name">
        <strong>{Users.getFullName(user)}</strong>
        <span>{ActivityLogs.getLabelAction(activity, i18n)}</span>
        {ActivityLogs.hasSectionLink(activity) && (
          <Link
            className={classNames('link', { disabled: ActivityLogs.isSectionLinkDisabled(activity) })}
            to={Routes.Section.generatePath({
              countryIso,
              assessmentName: assessment.props.name,
              cycleName: cycle.name,
              sectionName,
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
