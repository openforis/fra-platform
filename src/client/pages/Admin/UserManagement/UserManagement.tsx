import React, { useEffect } from 'react'

import { useAppDispatch } from '@client/store'
import { UserManagementActions, useUsers } from '@client/store/ui/userManagement'
import UserList from '@client/components/UserList'
import UserListFilters from '@client/components/UserList/UserListFilters'

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch()
  const users = useUsers()

  useEffect(() => {
    dispatch(UserManagementActions.getUsers({ limit: 20, offset: 0 * 20 }))
  }, [dispatch])

  return (
    <>
      <UserListFilters />
      <UserList users={users} isAdmin />
    </>
  )
}

export default UserManagement
