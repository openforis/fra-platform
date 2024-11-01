import './UserList.scss'
import React from 'react'

import UserInvitations from './UserInvitations'
import Users from './Users'

const UserList: React.FC = () => {
  return (
    <div className="user-list">
      <Users />
      <UserInvitations />
    </div>
  )
}

export default UserList
