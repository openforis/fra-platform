import React from 'react'

import { useUser } from 'client/store/user/hooks/user'
import Accept from 'client/pages/Authentication/Invitation/Accept'
import { useData } from 'client/pages/Authentication/Invitation/hooks/useData'
import Register from 'client/pages/Authentication/Invitation/Register'

const Invitation: React.FC = () => {
  const user = useUser()
  const data = useData()

  if (!data) return null

  // If the user is not logged in,
  // or the user is logged in with a different account than invited
  if (!user || data.user.uuid !== user.uuid) return <Register />

  return <Accept data={data} />
}

export default Invitation
