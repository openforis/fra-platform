import './EditUserForm.scss'
import React, { useState } from 'react'

import { RoleName, User, Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useCountryIso, useOnUpdate } from '@client/hooks'

import CollaboratorPermissions from './CollaboratorPermissions'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import TextInputField from './TextInputField'

type Props = {
  user: User
  canEditRoles?: boolean
}

const EditUserForm: React.FC<Props> = ({ user, canEditRoles }) => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()

  const [profilePicture, setProfilePicture] = useState<File>(null)
  const [userToEdit, setUserToEdit] = useState<User>(user)

  useOnUpdate(() => {
    if (!Users.validate(userToEdit).isError) {
      dispatch(
        UserManagementActions.updateUser({
          assessmentName: assessment?.props?.name,
          cycleName: cycle?.name,
          user: userToEdit,
          profilePicture,
          countryIso,
        })
      )
    }
  }, [profilePicture, userToEdit])

  if (!user) return null

  const userRole = Users.getRole(user, countryIso, cycle)

  return (
    <div className="edit-user__form-container">
      <ProfilePicture onChange={(profilePicture: File) => setProfilePicture(profilePicture)} userId={user.id} />

      <TextInputField name="email" onChange={setUserToEdit} user={userToEdit} validator={Users.validEmail} />

      <TextInputField name="title" onChange={setUserToEdit} user={userToEdit} isProperty onlySelf />

      <TextInputField name="name" onChange={setUserToEdit} user={userToEdit} isProperty onlySelf />

      <TextInputField name="surname" onChange={setUserToEdit} user={userToEdit} isProperty onlySelf />

      {userRole?.role === RoleName.COLLABORATOR && <CollaboratorPermissions userRole={userRole} />}

      {canEditRoles && <CountryRoles user={user} />}
    </div>
  )
}

EditUserForm.defaultProps = {
  canEditRoles: false,
}

export default EditUserForm
