import React from 'react'

import { Users } from '@meta/user'

import { useUser } from '@client/store/user'
import { useUsers } from '@client/store/userManagement/hooks'
import { useCountryIso } from '@client/hooks'
import InviteUserForm from '@client/components/InviteUserForm'
import UserList from '@client/components/UserList'

const Collaborators: React.FC = () => {
  const countryIso = useCountryIso()

  const user = useUser()
  const users = useUsers()

  return (
    <>
      {Users.getRolesAllowedToEdit({ user, countryIso }).length > 0 && <InviteUserForm />}
      <UserList users={users} isAdmin={Users.isAdministrator(user)} />
    </>
  )
}

export default Collaborators
