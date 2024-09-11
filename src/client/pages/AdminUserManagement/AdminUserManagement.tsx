import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RoleName } from 'meta/user'

import TablePaginated from 'client/components/TablePaginated'

import { useColumns } from './hooks/useColumns'

const AdminUserManagement: React.FC = () => {
  const columns = useColumns()
  const gridTemplateColumns = `repeat(${Object.values(RoleName).length + 1}, 1fr)`

  return (
    <TablePaginated
      columns={columns}
      gridTemplateColumns={gridTemplateColumns}
      limit={20}
      path={ApiEndPoint.Admin.users()}
    />
  )
}

export default AdminUserManagement
