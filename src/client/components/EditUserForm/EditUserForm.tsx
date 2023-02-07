import './EditUserForm.scss'
import React, { useState } from 'react'

import { RoleName, User, Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/ui/userManagement'
import { useUser } from '@client/store/user'
import { useCountryIso, useOnUpdate } from '@client/hooks'

import CollaboratorPermissions from './CollaboratorPermissions'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import SelectField from './SelectField'
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
  const userInfo = useUser()

  const [profilePicture, setProfilePicture] = useState<File>(null)
  const [userToEdit, setUserToEdit] = useState<User>(user)

  const changeUser = (name: string, value: string) => setUserToEdit({ ...user, [name]: value })

  const changeUserProp = (name: string, value: string) =>
    setUserToEdit({ ...user, props: { ...user.props, [name]: value } })

  useOnUpdate(() => {
    dispatch(
      UserManagementActions.updateUser({
        assessmentName: assessment?.props?.name,
        cycleName: cycle?.name,
        user: userToEdit,
        profilePicture,
        countryIso,
      })
    )
  }, [profilePicture, userToEdit])

  if (!user) return null

  const userRole = Users.getRole(user, countryIso, cycle)

  const enabled = Users.isAdministrator(userInfo) || user?.id === userInfo?.id

  return (
    <div className="edit-user__form-container">
      <ProfilePicture onChange={(profilePicture: File) => setProfilePicture(profilePicture)} userId={user.id} />

      <TextInputField
        name="email"
        value={user.email}
        onChange={changeUser}
        validator={Users.validEmail}
        enabled={enabled}
      />

      <SelectField
        name="title"
        value={user.props.title}
        options={['Ms', 'Mr', 'Other']}
        onChange={changeUserProp}
        enabled={enabled}
      />

      <TextInputField name="name" value={user.props.name} onChange={changeUserProp} enabled={enabled} />

      <TextInputField name="surname" value={user.props.surname} onChange={changeUserProp} enabled={enabled} />

      {userRole?.role === RoleName.COLLABORATOR && <CollaboratorPermissions userRole={userRole} />}

      {canEditRoles && <CountryRoles user={user} />}
    </div>
  )
}

EditUserForm.defaultProps = {
  canEditRoles: false,
}

export default EditUserForm
