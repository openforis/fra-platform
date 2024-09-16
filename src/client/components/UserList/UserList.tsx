import './UserList.scss'
import React from 'react'

import { User } from 'meta/user'

import CollaboratorListElement from './CollaboratorListElement'
import UserListEmpty from './UserListEmpty'
import UserListHeader from './UserListHeader'

type Props = {
  users: Array<User>
  readOnly?: boolean
}

const UserList: React.FC<Props> = (props) => {
  const { users, readOnly } = props

  if (!users.length) return <UserListEmpty />

  return (
    <table className="user-list__table">
      <UserListHeader readOnly={readOnly} />
      <tbody>
        {users.map((user: User) => (
          <CollaboratorListElement key={user.id} readOnly={readOnly} user={user} />
        ))}
      </tbody>
    </table>
  )
}

UserList.defaultProps = {
  readOnly: false,
}

export default UserList
