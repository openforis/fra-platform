import './UserList.scss'
import React from 'react'

import Export from './Export'
import UserInvitations from './UserInvitations'
import Users from './Users'

const UserList: React.FC = () => {
  return (
    <div className="user-list">
      <Export />

      <Users />
      <UserInvitations />
    </div>
  )
}

export default UserList
