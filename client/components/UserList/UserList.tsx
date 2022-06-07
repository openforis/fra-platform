import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { User, Users, UserStatus } from '@meta/user'

const UserColumn: React.FC<{ user: User; field: keyof User }> = ({ user, field }) => (
  <td className="user-list__cell">
    <div className="user-list__cell--read-only">{user[field] ? user[field] : '\xA0'}</div>
  </td>
)

const UserRoleColumn: React.FC<{ user: User }> = ({ user }) => {
  const { i18n } = useTranslation()
  return (
    <td className="user-list__cell">
      <div className="user-list__cell--read-only">{i18n.t(Users.getRoleNameTranslationKey(user.roles[0]))}</div>

      <div className="user-list__cell--read-only">{i18n.t(`user.roles.${user.roles[0].role.toLocaleLowerCase()}`)}</div>
    </td>
  )
}

const UserRow: React.FC<{ user: User }> = ({ user }) => (
  <tr className={classNames({ 'user-list__inactive-user': user.status === UserStatus.inactive })}>
    <UserColumn user={user} field="name" />
    <UserRoleColumn user={user} />
    <UserColumn user={user} field="email" />
  </tr>
)

const UsersTableHeadRow: React.FC = () => {
  const { i18n } = useTranslation()

  return (
    <thead>
      <tr>
        <th className="user-list__header-cell">{i18n.t('userManagement.name')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.role')}</th>
        <th className="user-list__header-cell">{i18n.t('userManagement.email')}</th>
      </tr>
    </thead>
  )
}

const UserList: React.FC<{ users: Array<User> }> = ({ users }) => {
  const { i18n } = useTranslation()

  return users && users.length > 0 ? (
    <table className="user-list__table">
      <UsersTableHeadRow />
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

export default UserList
