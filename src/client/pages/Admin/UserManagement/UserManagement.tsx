import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'
import UsersCount from 'client/pages/Admin/UserManagement/UsersCount'

import { useColumns } from './hooks/useColumns'
import { useFilters } from './hooks/useFilters'

const UserManagement: React.FC = () => {
  const columns = useColumns()
  const filters = useFilters()

  const gridTemplateColumns = `repeat(${columns.length}, 1fr)`

  return (
    <TablePaginated
      columns={columns}
      counter={{ show: true, Component: UsersCount }}
      export
      filters={filters}
      gridTemplateColumns={gridTemplateColumns}
      limit={20}
      path={ApiEndPoint.Admin.users()}
    />
  )
}

export default UserManagement
