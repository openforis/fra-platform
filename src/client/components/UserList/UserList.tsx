import './UserList.scss'
import React from 'react'

import { User } from 'meta/user'

import { useIsAdminRoute } from 'client/hooks'

import AdministrationListElement from './AdministrationListElement'
import CollaboratorListElement from './CollaboratorListElement'
import UserListEmpty from './UserListEmpty'
import UserListHeader from './UserListHeader'

type Props = {
  users: Array<User>
  readOnly?: boolean
}

const UserList: React.FC<Props> = (props) => {
  const { users, readOnly } = props
  const isAdminRoute = useIsAdminRoute()

  if (!users.length) return <UserListEmpty />

  return (
    <table className="user-list__table">
      <UserListHeader readOnly={readOnly} />
      <tbody>
        {users.map((user: User) =>
          isAdminRoute ? (
            <AdministrationListElement key={user.id} user={user} />
          ) : (
            <CollaboratorListElement readOnly={readOnly} key={user.id} user={user} />
          )
        )}
      </tbody>
    </table>
  )
}

UserList.defaultProps = {
  readOnly: false,
}

export default UserList
