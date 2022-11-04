import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, User } from '@meta/user'

import AdministrationListElement from './AdministrationListElement'
import CollaboratorListElement from './CollaboratorListElement'
import UserListHeader from './UserListHeader'

const roleNames = [
  RoleName.REVIEWER,
  RoleName.NATIONAL_CORRESPONDENT,
  RoleName.ALTERNATE_NATIONAL_CORRESPONDENT,
  RoleName.COLLABORATOR,
  RoleName.VIEWER,
]

type Props = {
  users: Array<User>
  isAdmin?: boolean
}

const UserList: React.FC<Props> = ({ users, isAdmin }) => {
  const { t } = useTranslation()

  return users && users.length > 0 ? (
    <table className="user-list__table">
      <UserListHeader isAdmin={isAdmin} roleNames={roleNames} />
      <tbody>
        {users.map((user: User) =>
          isAdmin ? (
            <AdministrationListElement key={user.id} user={user} roleNames={roleNames} />
          ) : (
            <CollaboratorListElement key={user.id} user={user} />
          )
        )}
      </tbody>
    </table>
  ) : (
    <>{t('userManagement.noUsers')}</>
  )
}

UserList.defaultProps = {
  isAdmin: false,
}

export default UserList
