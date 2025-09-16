import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'
import { useColumns } from 'client/pages/AdminInvitations/hooks/useColumns'
import { useFilters } from 'client/pages/AdminInvitations/hooks/useFilters'

const AdminInvitations: React.FC = () => {
  const columns = useColumns()
  const filters = useFilters()

  return <TablePaginated columns={columns} filters={filters} path={ApiEndPoint.Admin.invitations()} />
}

export default AdminInvitations
