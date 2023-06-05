import './UserList.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { User } from 'meta/user'

import AdministrationListElement from './AdministrationListElement'
import CollaboratorListElement from './CollaboratorListElement'
import UserListHeader from './UserListHeader'

type Props = {
  users: Array<User>
  isAdmin?: boolean
  readOnly?: boolean
}

const UserList: React.FC<Props> = ({ users, isAdmin, readOnly }) => {
  const { t } = useTranslation()

  return users?.length > 0 ? (
    <table className="user-list__table">
      <UserListHeader readOnly={readOnly} isAdmin={isAdmin} />
      <tbody>
        {users.map((user: User) =>
          isAdmin ? (
            <AdministrationListElement key={user.id} user={user} />
          ) : (
            <CollaboratorListElement readOnly={readOnly} key={user.id} user={user} />
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
  readOnly: false,
}

export default UserList
