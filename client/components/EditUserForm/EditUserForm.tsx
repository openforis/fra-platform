import './EditUserForm.scss'
import React from 'react'
import { useDispatch } from 'react-redux'

// import { validate } from '@common/userUtils'
import { User, UserStatus } from '@meta/user'

import { UserManagementActions } from '@client/store/userManagement'
import { useCountryIso } from '@client/hooks'

// import { persistUser } from '../../actions'
// import Buttons from './components/Buttons'
// import CountryRoles from './components/CountryRoles'
import ProfilePicture from './ProfilePicture'
import TextInputFields from './TextInputFields'

const EditUserForm: React.FC<{ user: User }> = ({ user }) => {
  const dispatch = useDispatch()

  const countryIso = useCountryIso()

  if (!user) return null

  // const onSave = () => {
  //   if (validate(user).valid) dispatch(persistUser(countryIso, user))
  // }

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

      {/* <CountryRoles onChange={onChange} user={user} />

      <Buttons
        user={user}
        userActive={user.status === UserStatus.active}
        onDeactivate={() => onChange(!UserStatus.active, 'active')}
        onCancel={() => dispatch(UserManagementActions.setUserToEdit(null))}
        onSave={onSave}
      /> */}
    </div>
  )
}

export default EditUserForm
