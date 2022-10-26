import React from 'react'

import { ClientRoutes } from '@meta/app'
import { Users } from '@meta/user'

import { useUser } from '@client/store/user'

const Admin: React.FC = () => {
  const user = useUser()

  const isAdministrator = Users.isAdministrator(user)

  if (!isAdministrator) window.location.href = ClientRoutes.Root.path

  return <div className="app-view__content">Placeholder</div>
}

export default Admin
