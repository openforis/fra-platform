import React, { useEffect } from 'react'

import { useAppDispatch } from '@client/store'
import { useFilters, UserManagementActions, useUsers } from '@client/store/ui/userManagement'
import UserList from '@client/components/UserList'
import UserListFilters from '@client/components/UserListFilters'

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const users = useUsers()
  const filters = useFilters()

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsers({ limit: 20, offset: 0 * 20, countries: filters.countries, roles: filters.roles })
    )
  }, [dispatch, filters])

  return (
    <>
      <UserListFilters />
      <UserList users={users} isAdmin />
    </>
  )
}

export default UserManagement
