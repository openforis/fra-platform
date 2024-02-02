import './EditUserForm.scss'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from 'meta/area'
import { Collaborator, RoleName, User, UserRole, Users } from 'meta/user'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { UserManagementActions } from 'client/store/ui/userManagement'
import { useUser } from 'client/store/user'
import { useCountryIso, useOnUpdate } from 'client/hooks'
import DisableUser from 'client/components/EditUserForm/DisableUser'
import UserCountryRoleSelector from 'client/components/EditUserForm/UserCountryRoleSelector'
import { useOptionsAppellation } from 'client/pages/Section/Contacts/hooks/useOptionsAppellation'

import CollaboratorPermissions from './CollaboratorPermissions'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import SelectField from './SelectField'
import TextInputField from './TextInputField'
import UserRolePropsFields from './UserRolePropsFields'

type Props = {
  targetUser: User
  canEditPermissions?: boolean
  canEditRoles?: boolean
  canEditUser?: boolean
}

const EditUserForm: React.FC<Props> = (props: Props) => {
  const { targetUser, canEditPermissions, canEditRoles, canEditUser } = props
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const user = useUser()
  const { t } = useTranslation()
  const appellationOptions = useOptionsAppellation()

  const [profilePicture, setProfilePicture] = useState<File>(null)
  const [userToEdit, setUserToEdit] = useState<User>(targetUser)
  const [roleToEdit, setRoleToEdit] = useState<UserRole<any, any>>(Users.getRole(targetUser, countryIso, cycle))

  const changeUser = (name: string, value: string) => setUserToEdit({ ...targetUser, [name]: value })

  const changeUserProp = (name: string, value: any) =>
    setUserToEdit({ ...targetUser, props: { ...targetUser.props, [name]: value } })

  const changeUserRoleProp = (name: string, value: string) =>
    setRoleToEdit({ ...roleToEdit, props: { ...roleToEdit.props, [name]: value } })

  useOnUpdate(() => {
    dispatch(
      UserManagementActions.updateRoleProps({
        id: userToEdit.id,
        assessmentName: assessment?.props?.name,
        cycleName: cycle?.name,
        role: roleToEdit,
        countryIso,
      })
    )
  }, [roleToEdit])

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

  if (!targetUser) return null

  const userRole = Users.getRole(targetUser, countryIso, cycle)

  const enabled = canEditUser
  const isAdmin = Users.isAdministrator(user)
  const isTargetAdmin = Users.isAdministrator(targetUser)
  const showRoleSelector = !Areas.isGlobal(countryIso) && isAdmin && !isTargetAdmin

  return (
    <div className="edit-user__form-container">
      <ProfilePicture
        onChange={(profilePicture: File) => setProfilePicture(profilePicture)}
        userId={targetUser.id}
        enabled={enabled}
      />
      <TextInputField
        name="email"
        value={targetUser.email}
        onChange={changeUser}
        validator={Users.validEmailField}
        enabled={Users.isAdministrator(user)}
        mandatory
      />
      <SelectField
        name="title"
        value={targetUser.props.title}
        onChange={changeUserProp}
        options={appellationOptions}
        enabled={enabled}
        mandatory
      />
      <TextInputField name="name" value={targetUser.props.name} onChange={changeUserProp} enabled={enabled} mandatory />
      <TextInputField
        name="surname"
        value={targetUser.props.surname}
        onChange={changeUserProp}
        enabled={enabled}
        mandatory
      />
      {showRoleSelector && <UserCountryRoleSelector user={targetUser} enabled={enabled} />}

      {[RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR].includes(
        userRole?.role
      ) &&
        roleToEdit && <UserRolePropsFields role={roleToEdit} onChange={changeUserRoleProp} enabled={enabled} />}
      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('editUser.mandatoryFields')}</div>
      </div>
      {canEditPermissions && userRole?.role === RoleName.COLLABORATOR && (
        <CollaboratorPermissions userRole={userRole as Collaborator} />
      )}
      {canEditRoles && <CountryRoles user={targetUser} />}

      {isAdmin && <DisableUser user={targetUser} changeUser={changeUser} />}
    </div>
  )
}

EditUserForm.defaultProps = {
  canEditPermissions: false,
  canEditRoles: false,
  canEditUser: false,
}

export default EditUserForm
