import React from 'react'

import { useUser } from 'client/store/user/hooks/user'
import Accept from 'client/pages/Authentication/Invitation/Accept'
import { useData } from 'client/pages/Authentication/Invitation/hooks/useData'
import Register from 'client/pages/Authentication/Invitation/Register'

const Invitation: React.FC = () => {
  const user = useUser()
  const data = useData()

  if (!data) return null
  if (!user) return <Register />

  if (data.user.uuid !== user.uuid) {
    return null
  }

  return <Accept data={data} />
}

export default Invitation
