import './UsersTable.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { User } from '@meta/user'

type UsersTableProps = {
  users: Array<User>
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const { i18n } = useTranslation()

  return users ? (
    <table className="user-list__table">
      <tbody>
        {users.length > 0 ? (
          users.map((user: User) => <div key={user.id}>{user.email}</div>)
        ) : (
          <>{i18n.t('userManagement.noUsers')}</>
        )}
      </tbody>
    </table>
  ) : null
}

export default UsersTable
