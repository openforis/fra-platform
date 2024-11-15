import './UserList.scss'
import React from 'react'

import Invite from './Invite'
import Users from './Users'

const UserList: React.FC = () => {
  return (
    <div className="country-home__user-list">
      <Invite />
      <Users />
    </div>
  )
}

export default UserList
