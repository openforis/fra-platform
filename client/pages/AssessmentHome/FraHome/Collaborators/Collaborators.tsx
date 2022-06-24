import React, { useEffect } from 'react'

import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
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
  const assessment = useAssessment()
  const cycle = useCycle()
  const user = useUser()

  const userToEdit = useUserToEdit()
  const users = useUsers()

  useEffect(() => {
    dispatch(UserManagementActions.setUserToEdit(null))
  }, [])

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
    )
  }, [countryIso])

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
