import React, { useEffect, useState } from 'react'

import { useAppDispatch } from '@client/store'
import { useFilters, UserManagementActions, useUsers } from '@client/store/ui/userManagement'
import UserList from '@client/components/UserList'
import UserListFilters from '@client/components/UserListFilters'
import UsersCount from '@client/components/UsersCount/UsersCount'

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch()

  const filters = useFilters()
  const users = useUsers()

  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsersCount({
        countries: filters.countries,
        roles: filters.roles,
      })
    )
    setPageNumber(0)
  }, [dispatch, filters.countries, filters.roles])

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsers({
        limit: 20,
        offset: pageNumber * 20,
        countries: filters.countries,
        roles: filters.roles,
      })
    )
  }, [dispatch, filters.countries, filters.roles, pageNumber])

  return (
    <>
      <UserListFilters />
      <UserList users={users} isAdmin />
      <UsersCount />
    </>
  )
}

export default UserManagement
