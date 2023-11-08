import './RecentActivityItem.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog, ActivityLogs } from 'meta/assessment'
import { Routes } from 'meta/routes'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/assessment'
import { useSection } from 'client/store/metadata'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ColumnComponentProps } from 'client/components/TablePaginated'
import { Dates } from 'client/utils'

const RecentActivityItem: React.FC<ColumnComponentProps<ActivityLog<never>>> = (props) => {
  const { datum: activity, rowIndex } = props
  const { user, section: sectionName } = activity

  const { i18n, t } = useTranslation()
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const cycle = useCycle()
  const section = useSection(sectionName)
  const anchor = section?.props?.anchors?.[cycle.uuid]

  return (
    <div className={classNames('landing__activity-item', { firstRow: rowIndex === 0 })}>
      <img
        className="landing__activity-avatar"
        src={ApiEndPoint.User.profilePicture(String(user.id))}
        alt={Users.getFullName(user)}
      />
      <div className="landing__activity-name">
        <strong>{Users.getFullName(user)}</strong>
        <span>{ActivityLogs.getLabelAction({ activity, t })}</span>

        {ActivityLogs.hasSectionLink(activity) && (
          <Link
            className={classNames('link', { disabled: ActivityLogs.isSectionLinkDisabled(activity) })}
            to={Routes.Section.generatePath({ countryIso, assessmentName, cycleName, sectionName })}
          >
            {anchor ? `${anchor} ` : ''}
            {ActivityLogs.getLabelSection({ cycle, section, activity, t })}
          </Link>
        )}
      </div>
      <div className="landing__activity-time">{Dates.getRelativeDate(activity.time, i18n)}</div>
    </div>
  )
}

export default RecentActivityItem
