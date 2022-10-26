import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { ClientRoutes } from '@meta/app'
import { Users } from '@meta/user'

import { useUser } from '@client/store/user'

const Admin: React.FC = () => {
  const user = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (Users.isAdministrator(user)) navigate(ClientRoutes.Root.path, { replace: true })
  }, [navigate, user])

  if (!user) return null

  return <div className="app-view__content">Placeholder</div>
}

export default Admin
