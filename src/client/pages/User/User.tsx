import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useUserToEdit } from '@client/store/ui//userManagement/hooks'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import EditUserForm from '@client/components/EditUserForm'

const User: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const user = useUser()
  const userToEdit = useUserToEdit()

  const { id: userId } = useParams<{ id: string }>()

  const isAdministrator = Users.isAdministrator(user)

  const canEditUser = Users.getRolesAllowedToEdit({ user, countryIso }).length > 0

  useEffect(() => {
    dispatch(UserManagementActions.getUserToEdit({ id: Number(userId) }))
    return () => {
      dispatch(UserManagementActions.setUserToEdit(null))
    }
  }, [dispatch, userId])

  if (!userToEdit) return null

  const canEditRoles = isAdministrator && user.id !== userToEdit.id

  return (
    <div className="app-view__content">
      {canEditUser && <EditUserForm canEditRoles={canEditRoles} user={userToEdit} />}
    </div>
  )
}

export default User
