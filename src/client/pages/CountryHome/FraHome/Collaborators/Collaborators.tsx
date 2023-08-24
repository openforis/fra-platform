import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { useUsers } from 'client/store/ui/userManagement'
import InviteUserForm from 'client/components/InviteUserForm'
import UserList from 'client/components/UserList'

const Collaborators: React.FC = () => {
  const users = useUsers()

  return (
    <Routes>
      <Route path="invite" element={<InviteUserForm />} />
      <Route index element={<UserList users={users} />} />
    </Routes>
  )
}

export default Collaborators
