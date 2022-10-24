import './EditUserForm.scss'
import React, { useCallback, useState } from 'react'

import { RoleName, User, Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useCountryIso, useOnUpdate } from '@client/hooks'

import CollaboratorPermissions from './CollaboratorPermissions'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import TextInputFields from './TextInputFields'

type Props = {
  user: User
  canEditRoles?: boolean
}

const EditUserForm: React.FC<Props> = ({ user, canEditRoles }) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()

  const [profilePicture, setProfilePicture] = useState<File>(null)
  const [userToEdit, setUserToEdit] = useState<User>(user)

  useOnUpdate(() => {
    if (!Users.validate(userToEdit).isError) {
      dispatch(
        UserManagementActions.updateUser({
          user: userToEdit,
          profilePicture,
          countryIso,
        })
      )
    }
  }, [profilePicture, userToEdit])

  const changeUser = useCallback((value: string, key: string) => setUserToEdit({ ...user, [key]: value }), [user])

  if (!user) return null

  const userRole = Users.getCountryRole(user, countryIso)

  return (
    <div className="edit-user__form-container">
      <ProfilePicture onChange={(profilePicture: File) => setProfilePicture(profilePicture)} userId={user.id} />

      <TextInputFields onChange={changeUser} user={userToEdit} />

      {userRole?.role === RoleName.COLLABORATOR && <CollaboratorPermissions userRole={userRole} />}

      {canEditRoles && <CountryRoles user={user} />}
    </div>
  )
}

EditUserForm.defaultProps = {
  canEditRoles: false,
}

export default EditUserForm
