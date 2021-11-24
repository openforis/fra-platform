import './editUserForm.less'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { validate } from '@common/userUtils'
import { useCountryIso } from '../../../../../store/app'
import { loadUserToEdit, persistUser } from '../../actions'

import Buttons from './components/Buttons'
import ProfilePicture from './components/ProfilePicture'
import CountryRoles from './components/CountryRoles'
import TextInputFields from './components/TextInputFields'

type Props = {
  onCancel?: any
  userId: any
}

const EditUserForm = (props: Props) => {
  const { userId, onCancel = window.history.back } = props
  const dispatch = useDispatch()
  const countryIso = useCountryIso()
  // @ts-ignore
  const stateUser = useSelector((state) => state?.userManagement?.editUser?.user)

  const [user, setUser]: any = useState({})

  useEffect(() => {
    dispatch(loadUserToEdit(userId))
  }, [userId])

  useEffect(() => {
    setUser(stateUser)
  }, [stateUser])

  if (!user) return null

  const onSave = () => {
    if (validate(user).valid) dispatch(persistUser(countryIso, user))
  }

  const onChange = (value: any, key: any) => {
    setUser({
      ...user,
      [key]: value,
    })
  }

  return (
    <div className="edit-user__form-container">
      <ProfilePicture userId={user.id} onChange={(profilePicture: any) => onChange(profilePicture, 'profilePicture')} />

      <TextInputFields user={user} onChange={onChange} />

      <CountryRoles onChange={onChange} user={user} />

      <Buttons
        user={user}
        userActive={user.active}
        onDeactivate={() => onChange(!user.active, 'active')}
        onCancel={onCancel}
        onSave={onSave}
      />
    </div>
  )
}

export default EditUserForm
