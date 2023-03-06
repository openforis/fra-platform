import React from 'react'

import classNames from 'classnames'

import { RoleName, User, Users, UserStatus } from '@meta/user'

import { useFilteredRoleNames } from '@client/store/ui/userManagement'

import UserField from '../UserField'
import UserRolesField from '../UserRolesField'

const AdministrationListElement: React.FC<{ user: User }> = ({ user }) => {
  const filteredRoleNames = useFilteredRoleNames()

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
      <UserField user={user} field="email" />
      <td className="user-list__cell user-list__edit-column" />
    </tr>
  )
}

export default AdministrationListElement
