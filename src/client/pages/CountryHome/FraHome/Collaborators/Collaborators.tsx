import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Routes as ApplicationRoutes } from 'meta/routes'

import { useUsers } from 'client/store/ui/userManagement'
import InviteUserForm from 'client/components/InviteUserForm'
import UserList from 'client/components/UserList'

const Collaborators: React.FC = () => {
  const users = useUsers()

  return (
    <Routes>
      <Route path={ApplicationRoutes.CountryHomeSectionInvite.path.relative} element={<InviteUserForm />} />
      <Route index element={<UserList users={users} />} />
    </Routes>
  )
}

export default Collaborators
