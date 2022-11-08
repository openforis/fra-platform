import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Objects } from '@utils/objects'
import classNames from 'classnames'

import { ClientRoutes } from '@meta/app'
import { RoleName, User, UserStatus } from '@meta/user'

import { useFilters } from '@client/store/ui/userManagement/hooks'
import { roleNames } from '@client/pages/Admin/UserManagement/utils/roleNames'

import UserField from '../UserField'
import UserRolesField from '../UserRolesField'

const AdministrationListElement: React.FC<{ user: User }> = ({ user }) => {
  const filters = useFilters()

  const { t } = useTranslation()

  const { id, status } = user

  return (
    <tr
      className={classNames({
        'user-list__inactive-user': status === UserStatus.inactive,
      })}
    >
      <UserField user={user} field="name" />
      {(Objects.isEmpty(filters.roles) ? roleNames : filters.roles).map((roleName: RoleName) => (
        <UserRolesField key={roleName} roleName={roleName} user={user} />
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
