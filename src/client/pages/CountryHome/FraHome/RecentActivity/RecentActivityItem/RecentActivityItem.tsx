import './RecentActivityItem.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'
import { Dates } from 'utils/dates'

import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog } from 'meta/assessment/activityLog'
import { ActivityLogs } from 'meta/assessment/activityLogs'
import { Users } from 'meta/user'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useSection } from 'client/store/meta/hooks/sections'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { ColumnComponentProps } from 'client/components/TablePaginated'

const RecentActivityItem: React.FC<ColumnComponentProps<ActivityLog<never>>> = (props) => {
  const { datum: activity, rowIndex } = props
  const { section: sectionName, user } = activity

  const { i18n, t } = useTranslation()
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const cycle = useCycle()
  const section = useSection(sectionName)
  const anchor = section?.props?.anchors?.[cycle.uuid]

  return (
    <div className={classNames('landing__activity-item', { firstRow: rowIndex === 0 })}>
      <img
        alt={Users.getFullName(user)}
        className="landing__activity-avatar"
        src={ApiEndPoint.User.profilePicture(String(user.id))}
      />
      <div className="landing__activity-name">
        <strong>{Users.getFullName(user)}</strong>
        <span>{ActivityLogs.getLabelAction({ activity, t })}</span>

        {ActivityLogs.hasSectionLink(activity) && (
          <Link
            className={classNames('link', { disabled: ActivityLogs.isSectionLinkDisabled(activity) })}
            to={ActivityLogs.getSectionLink({ countryIso, assessmentName, cycleName, sectionName })}
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
