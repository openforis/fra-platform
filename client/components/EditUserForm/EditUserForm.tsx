import './EditUserForm.scss'
import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { RoleName, User, UserRole, Users, UserStatus } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso } from '@client/hooks'
import { useToaster } from '@client/hooks/useToaster'

import Buttons from './Buttons'
import CountryRoles from './CountryRoles'
import ProfilePicture from './ProfilePicture'
import TextInputFields from './TextInputFields'

const EditUserForm: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const { toaster } = useToaster()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  const [profilePicture, setProfilePicture] = useState<File>(null)

  const saveUser = useCallback(() => {
    if (!Users.validate(user).isError) {
      dispatch(
        UserManagementActions.updateUser({
          user,
          profilePicture,
          countryIso,
          assessmentName: assessment.props.name,
          cycleName: cycle.name,
        })
      ).then(() => {
        dispatch(
          UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
        )
        dispatch(UserManagementActions.setUserToEdit(null))
        toaster.success(i18n.t('userManagement.userModified', { user: user.name }))
      })
    }
  }, [assessment.props.name, countryIso, cycle.name, dispatch, i18n, profilePicture, toaster, user])

  const changeUser = useCallback(
    (value: string | Array<Partial<UserRole<RoleName>>>, key: string) => {
      dispatch(
        UserManagementActions.setUserToEdit({
          ...user,
          [key]: value,
        })
      )
    },
    [dispatch, user]
  )

  const deactivateUser = useCallback(() => {
    dispatch(
      UserManagementActions.setUserToEdit({
        ...user,
        status: user.status === UserStatus.active ? UserStatus.inactive : UserStatus.active,
      })
    )
  }, [dispatch, user])

  if (!user) return null

  return (
    <div className="edit-user__form-container">
      <ProfilePicture userId={user.id} onChange={(profilePicture: File) => setProfilePicture(profilePicture)} />
      <TextInputFields user={user} onChange={changeUser} />
      <CountryRoles onChange={changeUser} user={user} />

      <Buttons
        user={user}
        userActive={user.status === UserStatus.active}
        onDeactivate={deactivateUser}
        onCancel={() => dispatch(UserManagementActions.setUserToEdit(null))}
        onSave={saveUser}
      />
    </div>
  )
}

export default EditUserForm
