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
import { useOptionsAppellation } from 'client/hooks/useOptionsAppellation'
import DisableUser from 'client/components/EditUserForm/DisableUser'
import UserCountryRoleSelector from 'client/components/EditUserForm/UserCountryRoleSelector'

import CollaboratorPermissions from './CollaboratorPermissions'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import SelectField from './SelectField'
import TextInputField from './TextInputField'
import UserRolePropsFields from './UserRolePropsFields'

type Props = {
  canEditPermissions?: boolean
  canEditRoles?: boolean
  canEditUser?: boolean
  targetUser: User
}

const EditUserForm: React.FC<Props> = (props: Props) => {
  const { canEditPermissions, canEditRoles, canEditUser, targetUser } = props
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
  const isSelf = user.id === targetUser.id
  const showRoleSelector =
    !Areas.isGlobal(countryIso) &&
    !isSelf &&
    ((isAdmin && !isTargetAdmin) || Users.getRolesAllowedToEdit({ user, cycle, countryIso }).length > 0)

  return (
    <div className="edit-user__form-container">
      <ProfilePicture
        enabled={enabled}
        onChange={(profilePicture: File) => setProfilePicture(profilePicture)}
        userId={targetUser.id}
      />
      <TextInputField
        enabled={Users.isAdministrator(user)}
        mandatory
        name="email"
        onChange={changeUser}
        validator={Users.validEmailField}
        value={targetUser.email}
      />
      <SelectField
        enabled={enabled}
        mandatory
        name="title"
        onChange={changeUserProp}
        options={appellationOptions}
        value={targetUser.props.title}
      />
      <TextInputField enabled={enabled} mandatory name="name" onChange={changeUserProp} value={targetUser.props.name} />
      <TextInputField
        enabled={enabled}
        mandatory
        name="surname"
        onChange={changeUserProp}
        value={targetUser.props.surname}
      />
      {showRoleSelector && <UserCountryRoleSelector enabled={enabled} target={targetUser} />}

      {[RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT, RoleName.COLLABORATOR].includes(
        userRole?.role
      ) &&
        roleToEdit && <UserRolePropsFields enabled={enabled} onChange={changeUserRoleProp} role={roleToEdit} />}
      <div className="edit-user__form-item">
        <div className="edit-user__form-label">{t('editUser.mandatoryFields')}</div>
      </div>
      {canEditPermissions && userRole?.role === RoleName.COLLABORATOR && (
        <CollaboratorPermissions userRole={userRole as Collaborator} />
      )}
      {canEditRoles && <CountryRoles user={targetUser} />}

      {isAdmin && <DisableUser changeUser={changeUser} user={targetUser} />}
    </div>
  )
}

export default EditUserForm
