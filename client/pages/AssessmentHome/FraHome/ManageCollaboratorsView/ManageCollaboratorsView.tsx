import React, { useEffect } from 'react'

import { useAppDispatch } from '@client/store'
import { UserManagementActions } from '@client/store/userManagement'
import { useCountryUsers } from '@client/store/userManagement/hooks'
import { useCountryIso } from '@client/hooks'
import UserList from '@client/components/UserList'

const ManageCollaboratorsView: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  const countryUsers = useCountryUsers()

  useEffect(() => {
    dispatch(UserManagementActions.getCountryUsers({ countryIso }))
  }, [countryIso])

  return <UserList users={countryUsers} />
}

export default ManageCollaboratorsView
