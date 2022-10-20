import './EditUserForm.scss'
import React, { useCallback, useState } from 'react'

import { RoleName, User, Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso, useOnUpdate } from '@client/hooks'

import CollaboratorPermissions from './CollaboratorPermissions'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import TextInputFields from './TextInputFields'

type Props = {
  user: User
  isAdminForm?: boolean
}

const EditUserForm: React.FC<Props> = ({ user, isAdminForm }) => {
  const dispatch = useAppDispatch()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const [profilePicture, setProfilePicture] = useState<File>(null)
  const [userToEdit, setUserToEdit] = useState<User>(user)

  useOnUpdate(() => {
    if (!Users.validate(userToEdit).isError) {
      dispatch(
        UserManagementActions.updateUser({
          user: userToEdit,
          profilePicture,
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
        })
      )
    }
  }, [profilePicture, userToEdit])

  const changeUser = useCallback((value: string, key: string) => setUserToEdit({ ...user, [key]: value }), [user])

  if (!user) return null

  const userRole = Users.getCountryRole(user, countryIso)

  return (
    <div className="edit-user__form-container">
      <ProfilePicture userId={user.id} onChange={(profilePicture: File) => setProfilePicture(profilePicture)} />

      <TextInputFields onChange={changeUser} user={user} />

      {userRole?.role === RoleName.COLLABORATOR && <CollaboratorPermissions userRole={userRole} />}

      {isAdminForm && <CountryRoles user={user} />}
    </div>
  )
}

EditUserForm.defaultProps = {
  isAdminForm: false,
}

export default EditUserForm
