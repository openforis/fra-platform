import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { User } from '@meta/user'

import AdministrationListElement from './UserListElement/AdministrationListElement'
import CollaboratorListElement from './UserListElement/CollaboratorListElement'
import UserListHeader from './UserListHeader'

type Props = {
  users: Array<User>
  isAdmin?: boolean
}

const UserList: React.FC<Props> = ({ users, isAdmin }) => {
  const { t } = useTranslation()

  return users && users.length > 0 ? (
    <table className="user-list__table">
      <UserListHeader isAdmin={isAdmin} />
      <tbody>
        {users.map((user: User) =>
          isAdmin ? <AdministrationListElement user={user} /> : <CollaboratorListElement user={user} />
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
