import './EditUserForm.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, User, UserRole, Users } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso, useOnUpdate } from '@client/hooks'

import CollaboratorPermissions from './CollaboratorPermissions'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import TextInputFields from './TextInputFields'

const EditUserForm: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
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

  const changeUserRoles = useCallback(
    (roles: Array<Partial<UserRole<RoleName>>>) => {
      dispatch(
        UserManagementActions.updateUserRoles({
          roles,
          userId: user.id,
        })
      )
    },
    [dispatch, user.id]
  )

  if (!user) return null

  const userRole = Users.getCountryRole(user, countryIso)

  return (
    <div className="edit-user__form-container">
      <ProfilePicture userId={user.id} onChange={(profilePicture: File) => setProfilePicture(profilePicture)} />

      <TextInputFields onChange={changeUser} user={user} />

      {userRole?.role === RoleName.COLLABORATOR && <CollaboratorPermissions userRole={userRole} />}

      <CountryRoles onChange={changeUserRoles} user={user} />

      <div className="edit-user__form-item edit-user__form-item-buttons">
        <div className="edit-user__form-label" />
        <div className="edit-user__form-field edit-user__form-field-buttons">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch(UserManagementActions.setUserToEdit(null))}
          >
            {i18n.t<string>('editUser.cancel')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditUserForm
