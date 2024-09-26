import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RoleName } from 'meta/user'

import TablePaginated from 'client/components/TablePaginated'
import UsersCount from 'client/pages/Admin/UserManagement/UsersCount'
import UsersEmptyList from 'client/pages/Admin/UserManagement/UsersEmptyList'

import { useColumns } from './hooks/useColumns'
import { useFilters } from './hooks/useFilters'

const UserManagement: React.FC = () => {
  const columns = useColumns()
  const filters = useFilters()

  const gridTemplateColumns = `repeat(${Object.values(RoleName).length + 1}, 1fr)`

  return (
    <TablePaginated
      columns={columns}
      counter={{ show: true, Component: UsersCount }}
      emptyList={{ Component: UsersEmptyList, showInTable: true }}
      export
      filters={filters}
      gridTemplateColumns={gridTemplateColumns}
      limit={20}
      path={ApiEndPoint.Admin.users()}
    />
  )
}

export default UserManagement
