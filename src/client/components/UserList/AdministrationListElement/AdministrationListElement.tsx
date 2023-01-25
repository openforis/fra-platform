import React from 'react'

// import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'
import classNames from 'classnames'

// import { ClientRoutes } from '@meta/app'
import { RoleName, User, UserStatus } from '@meta/user'

import { useFilteredRoleNames } from '@client/store/ui/userManagement'

import UserField from '../UserField'
import UserRolesField from '../UserRolesField'

const AdministrationListElement: React.FC<{ user: User }> = ({ user }) => {
  const filteredRoleNames = useFilteredRoleNames()

  // const { t } = useTranslation()

  // const { id, status } = user

  const { status } = user

  return (
    <tr
      className={classNames({
        'user-list__inactive-user': status === UserStatus.inactive,
      })}
    >
      <td className="user-list__cell">
        <div className="user-list__cell--read-only">{user.props.name}</div>
      </td>
      {filteredRoleNames.map((roleName: RoleName) => (
        <UserRolesField key={roleName} roleName={roleName} user={user} />
      ))}
      <UserField user={user} field="email" />
      <td className="user-list__cell user-list__edit-column">
        {/* <Link to={ClientRoutes.Admin.User.getLink({ id })} type="button" className="link">
          {t('userManagement.edit')}
        </Link> */}
      </td>
    </tr>
  )
}

export default AdministrationListElement
