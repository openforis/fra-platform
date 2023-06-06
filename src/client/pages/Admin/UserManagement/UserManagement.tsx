import './UserManagement.scss'
import React, { useEffect, useState } from 'react'

import { useAppDispatch } from 'client/store'
import { useAssessment, useCycle } from 'client/store/assessment'
import { useFilters, UserManagementActions, useUsers, useUsersCount } from 'client/store/ui/userManagement'
import Paginator from 'client/components/Paginator'
import UserList from 'client/components/UserList'
import UserListFilters from 'client/components/UserListFilters'
import UsersCount from 'client/components/UsersCount/UsersCount'
import { DOMs } from 'client/utils/dom'

const UserManagement: React.FC = () => {
  const dispatch = useAppDispatch()

  const assessment = useAssessment()
  const cycle = useCycle()

  const filters = useFilters()
  const users = useUsers()
  const usersCount = useUsersCount()

  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    return () => {
      dispatch(UserManagementActions.resetFilters())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsersCount({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        countries: filters.countries,
        fullName: filters.fullName,
        roles: filters.roles,
      })
    )
    setPageNumber(0)
  }, [assessment.props.name, cycle.name, dispatch, filters])

  useEffect(() => {
    dispatch(
      UserManagementActions.getUsers({
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        limit: 20,
        offset: pageNumber * 20,
        countries: filters.countries,
        fullName: filters.fullName,
        roles: filters.roles,
        administrators: true,
      })
    )
  }, [assessment, cycle, dispatch, filters, pageNumber])

  return (
    <>
      <UserListFilters />

      <UserList users={users} isAdmin />

      <Paginator
        className="user-paginator"
        onPageChange={(n) => {
          setPageNumber(n)
          DOMs.scrollTo()
        }}
        pageRangeDisplayed={5}
        pageCount={Math.ceil(usersCount.totals / 20)}
      />

      <UsersCount />
    </>
  )
}

export default UserManagement
