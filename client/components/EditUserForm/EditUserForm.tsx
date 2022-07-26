import './EditUserForm.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { validate } from '@common/userUtils'

import { User, UserStatus } from '@meta/user'

import { useAppDispatch } from '@client/store'
import { useAssessment, useCycle } from '@client/store/assessment'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso } from '@client/hooks'
import { useToaster } from '@client/hooks/useToaster'

import Buttons from './Buttons'
// import { persistUser } from '../../actions'
// import CountryRoles from './components/CountryRoles'
import ProfilePicture from './ProfilePicture'
import TextInputFields from './TextInputFields'

const EditUserForm: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const { toaster } = useToaster()
  const countryIso = useCountryIso()
  const assessment = useAssessment()
  const cycle = useCycle()

  if (!user) return null

  const onSave = () => {
    if (validate(user).valid) {
      dispatch(UserManagementActions.updateUser({ user })).then(() => {
        UserManagementActions.getUsers({ countryIso, assessmentName: assessment.props.name, cycleName: cycle.name })
        dispatch(UserManagementActions.setUserToEdit(null))
        toaster.success(i18n.t('userManagement.userAdded', { email: user.email }))
      })
    }
  }

  const onChange = (value: string, key: string) => {
    dispatch(
      UserManagementActions.setUserToEdit({
        ...user,
        [key]: value,
      })
    )
  }

  return (
    <div className="edit-user__form-container">
      <ProfilePicture userId={user.id} onChange={(profilePicture: any) => onChange(profilePicture, 'profilePicture')} />
      <TextInputFields user={user} onChange={onChange} />
      {/* <CountryRoles onChange={onChange} user={user} /> */}

      <Buttons
        user={user}
        userActive={user.status === UserStatus.active}
        onDeactivate={() =>
          dispatch(
            UserManagementActions.setUserToEdit({
              ...user,
              status: user.status === UserStatus.active ? UserStatus.inactive : UserStatus.active,
            })
          )
        }
        onCancel={() => dispatch(UserManagementActions.setUserToEdit(null))}
        onSave={onSave}
      />
    </div>
  )
}

export default EditUserForm
