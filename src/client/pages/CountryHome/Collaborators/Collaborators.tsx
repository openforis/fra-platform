import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Routes as ApplicationRoutes } from 'meta/routes'

import InviteUserForm from 'client/components/InviteUserForm'

import UserList from './UserList'

const Collaborators: React.FC = () => {
  return (
    <Routes>
      <Route element={<InviteUserForm />} path={ApplicationRoutes.CountryHomeSectionInvite.path.relative} />
      <Route element={<UserList />} index />
    </Routes>
  )
}

export default Collaborators
