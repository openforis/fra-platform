import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { User } from '@meta/user'

import UserListElement from './UserListElement'
import UserListHeader from './UserListHeader'

const UserList: React.FC<{ users: Array<User>; isAdmin: boolean }> = ({ users, isAdmin }) => {
  const { t } = useTranslation()

  return users && users.length > 0 ? (
    <table className="user-list__table">
      <UserListHeader showLoginEmail={!isAdmin} showRole={!isAdmin} showRoles={isAdmin} />
      <tbody>
        {users.map((user: User) => (
          <UserListElement isAdmin key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  ) : (
    <>{t('userManagement.noUsers')}</>
  )
}

export default UserList
