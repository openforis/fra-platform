import React, { useEffect } from 'react'

import { useAppDispatch } from '@client/store'
import { UserManagementActions } from '@client/store/userManagement'
import { useUsers } from '@client/store/userManagement/hooks'
import { useCountryIso } from '@client/hooks'
import UserList from '@client/components/UserList'

const Collaborators: React.FC = () => {
  const dispatch = useAppDispatch()

  const countryIso = useCountryIso()
  const countryUsers = useUsers()

  useEffect(() => {
    dispatch(UserManagementActions.getCountryUsers({ countryIso }))
  }, [countryIso])

  return <UserList users={countryUsers} />
}

export default Collaborators
