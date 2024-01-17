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

import CollaboratorPermissions from './CollaboratorPermissions'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import SelectField from './SelectField'
import TextInputField from './TextInputField'
import UserRolePropsFields from './UserRolePropsFields'

type Props = {
  user: User
  canEditPermissions?: boolean
  canEditRoles?: boolean
  canEditUser?: boolean
}

const EditUserForm: React.FC<Props> = ({ user, canEditPermissions, canEditRoles, canEditUser }) => {
  const dispatch = useAppDispatch()
  const assessment = useAssessment()
  const countryIso = useCountryIso()
  const cycle = useCycle()
  const userInfo = useUser()
  const { t } = useTranslation()

  const [profilePicture, setProfilePicture] = useState<File>(null)
  const [userToEdit, setUserToEdit] = useState<User>(user)
  const [roleToEdit, setRoleToEdit] = useState<UserRole<any, any>>(Users.getRole(user, countryIso, cycle))

  const changeUser = (name: string, value: string) => setUserToEdit({ ...user, [name]: value })

  const changeUserProp = (name: string, value: any) =>
    setUserToEdit({ ...user, props: { ...user.props, [name]: value } })

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

  if (!user) return null

  const userRole = Users.getRole(user, countryIso, cycle)

  const enabled = canEditUser
  const isAdmin = Users.isAdministrator(userInfo)
  const showRoleSelector = !Areas.isGlobal(countryIso) && isAdmin

  return (
    <div className="edit-user__form-container">
      <ProfilePicture
        onChange={(profilePicture: File) => setProfilePicture(profilePicture)}
        userId={user.id}
        enabled={enabled}
      />
      <TextInputField
        name="email"
        value={user.email}
        onChange={changeUser}
        validator={Users.validEmailField}
        enabled={Users.isAdministrator(userInfo)}
        mandatory
      />
      <SelectField
        name="title"
        value={user.props.title}
        onChange={changeUserProp}
        options={{ Ms: 'Ms', Mr: 'Mr', Other: 'Other' }}
        enabled={enabled}
        mandatory
      />
      <TextInputField name="name" value={user.props.name} onChange={changeUserProp} enabled={enabled} mandatory />
      <TextInputField name="surname" value={user.props.surname} onChange={changeUserProp} enabled={enabled} mandatory />
      {showRoleSelector && <UserCountryRoleSelector user={user} enabled={enabled} />}

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
      {canEditRoles && <CountryRoles user={user} />}

      {isAdmin && <DisableUser user={user} changeUser={changeUser} />}
    </div>
  )
}

EditUserForm.defaultProps = {
  canEditPermissions: false,
  canEditRoles: false,
  canEditUser: false,
}

export default EditUserForm
