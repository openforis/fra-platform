import './Users.scss'
import React, { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryUserSummary } from 'meta/user'

import TablePaginated, { Column } from 'client/components/TablePaginated'

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

  return (
    <div className="home-users">
      <TablePaginated columns={columns} counter={counter} header={header} path={path} />
    </div>
  )
}

export default UserComponent
