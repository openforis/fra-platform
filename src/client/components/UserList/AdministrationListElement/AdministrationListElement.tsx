import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { Global } from 'meta/area'
import { Routes } from 'meta/routes'
import { RoleName, User, Users, UserStatus } from 'meta/user'

import { useAssessment, useCycle } from 'client/store/assessment'
import { useFilteredRoleNames } from 'client/store/ui/userManagement'

import UserRolesField from '../UserRolesField'

const AdministrationListElement: React.FC<{ user: User }> = ({ user }) => {
  const assessment = useAssessment()
  const cycle = useCycle()

  const filteredRoleNames = useFilteredRoleNames()

  const { t } = useTranslation()

  const { id } = user

  return (
    <tr
      className={classNames({
        'user-list__inactive-user': user.status === UserStatus.inactive,
      })}
    >
      <td className="user-list__cell">
        <div className="user-list__cell--read-only">{Users.getFullName(user)}</div>
      </td>
      {filteredRoleNames.map((roleName: RoleName) => (
        <UserRolesField key={roleName} roleName={roleName} user={user} />
      ))}
      <td className="user-list__cell user-list__edit-column">
        <Link
          to={Routes.CountryUser.generatePath({
            assessmentName: assessment.props.name,
            countryIso: Global.WO,
            cycleName: cycle.name,
            id,
          })}
          type="button"
          className="link"
        >
          {t('userManagement.edit')}
        </Link>
      </td>
    </tr>
  )
}

export default AdministrationListElement
