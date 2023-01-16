import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { AssessmentName } from '@meta/assessment'
import { Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useCycle } from '@client/store/assessment'
import { useUserToEdit } from '@client/store/ui//userManagement/hooks'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useUser } from '@client/store/user'
import { useCountryIso } from '@client/hooks'
import EditUserForm from '@client/components/EditUserForm'

const User: React.FC = () => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()
  const userToEdit = useUserToEdit()

  const {
    assessmentName,
    cycleName,
    id: userId,
  } = useParams<{ assessmentName: AssessmentName; cycleName: string; id: string }>()

  const isAdministrator = Users.isAdministrator(user)

  const isSelf = String(user?.id) === userId

  const canEditUser = isSelf || Users.getRolesAllowedToEdit({ user, countryIso, cycle }).length > 0

  useEffect(() => {
    dispatch(
      UserManagementActions.getUserToEdit({
        assessmentName,
        countryIso,
        cycleName,
        id: Number(userId),
      })
    )
    return () => {
      dispatch(UserManagementActions.setUserToEdit(null))
    }
  }, [assessmentName, countryIso, cycleName, dispatch, userId])

  if (!userToEdit) return null

  const canEditRoles = isAdministrator && user.id !== userToEdit.id

  return (
    <div className="app-view__content">
      {canEditUser && <EditUserForm canEditRoles={canEditRoles} user={userToEdit} />}
    </div>
  )
}

export default User
