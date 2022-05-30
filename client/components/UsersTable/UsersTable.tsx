import './UsersTable.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User, UserStatus } from '@meta/user'

const UserColumn: React.FC<{ user: User; field: keyof User }> = ({ user, field }) => (
  <td className="user-list__cell">
    <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>
  </td>
)

const UserRow: React.FC<{ user: User }> = ({ user }) => (
  <tr className={classNames({ 'user-list__inactive-user': user.status === UserStatus.inactive })}>
    <UserColumn user={user} field="name" />
  </tr>
)

const UsersTable: React.FC<{ users: Array<User> }> = ({ users }) => {
  const { i18n } = useTranslation()

  return users && users.length > 0 ? (
    <table className="user-list__table">
      <tbody>
        {users.map((user: User) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  ) : (
    <>{i18n.t('userManagement.noUsers')}</>
  )
}

export default UsersTable
