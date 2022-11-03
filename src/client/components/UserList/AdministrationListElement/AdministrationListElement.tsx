import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { RoleName, User, UserStatus } from '@meta/user'
import { UserRoles } from '@meta/user/userRoles'

import UserField from '../UserField'

const AdministrationListElement: React.FC<{ user: User }> = ({ user }) => {
  const { t } = useTranslation()

  const { id, status } = user

  return (
    <tr
      className={classNames({
        'user-list__inactive-user': status === UserStatus.inactive,
      })}
    >
      <UserField user={user} field="name" />
      {UserRoles.roles.map((role: RoleName) => (
        <td className="user-list__cell" key={user.id}>
          <div className="user-list__cell--read-only">{role}</div>
        </td>
      ))}
      <UserField user={user} field="email" />
      <td className="user-list__cell user-list__edit-column">
        <Link to={ClientRoutes.Admin.User.getLink({ id })} type="button" className="link">
          {t('userManagement.edit')}
        </Link>
      </td>
    </tr>
  )
}

export default AdministrationListElement
