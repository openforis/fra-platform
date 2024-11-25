import './Users.scss'
import React, { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryUserSummary } from 'meta/user'

import TablePaginated, { Column } from 'client/components/TablePaginated'
import { useUserSortFn } from 'client/pages/CountryHome/Collaborators/UserList/Users/useUserSortFn'

import UserCard from './UserCard'

const useColumns = (): Array<Column<CountryUserSummary>> => {
  return useMemo<Array<Column<CountryUserSummary>>>(
    () => [
      {
        header: '',
        key: 'info',
        component: ({ datum }) => <UserCard user={datum} />,
      },
    ],
    []
  )
}

const UserComponent: React.FC = () => {
  const columns = useColumns()

  const counter = { show: false }
  const header = false
  const path = ApiEndPoint.User.many()

  // Sort users client side: invited users bottom of the list
  const sortFn = useUserSortFn()

  return (
    <div className="home-users">
      <TablePaginated columns={columns} counter={counter} header={header} path={path} sortFn={sortFn} />
    </div>
  )
}

export default UserComponent
