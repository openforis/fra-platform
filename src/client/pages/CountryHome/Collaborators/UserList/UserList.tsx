import './UserList.scss'
import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'
import { useUserSortFn } from './hooks/useUserSortFn'
import Invite from './Invite'

const counter = { show: false }
const header = false
const path = ApiEndPoint.User.many()

const UserList: React.FC = () => {
  const columns = useColumns()
  const sortFn = useUserSortFn()

  return (
    <div className="country-home__user-list">
      <Invite />

      <TablePaginated columns={columns} counter={counter} header={header} path={path} sortFn={sortFn} />
    </div>
  )
}

export default UserList
