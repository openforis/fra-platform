import React, { useEffect } from 'react'

import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useUser } from '@client/store/user'
import { UserManagementActions } from '@client/store/userManagement'
import { useUsers, useUserToEdit } from '@client/store/userManagement/hooks'
import { useCountryIso } from '@client/hooks'
import EditUserForm from '@client/components/EditUserForm'
import InviteUserForm from '@client/components/InviteUserForm'
import UserList from '@client/components/UserList'

const Collaborators: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  const user = useUser()

  const userToEdit = useUserToEdit()
  const users = useUsers()

  useEffect(() => {
    dispatch(UserManagementActions.setUserToEdit(null))
  }, [dispatch])

  return userToEdit ? (
    <EditUserForm user={userToEdit} />
  ) : (
    <>
      {Users.getRolesAllowedToEdit({ user, countryIso }).length > 0 && <InviteUserForm />}
      <UserList users={users} isAdmin={Users.isAdministrator(user)} />
    </>
  )
}

export default Collaborators
