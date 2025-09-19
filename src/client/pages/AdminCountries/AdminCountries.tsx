import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'
import { useColumns } from 'client/pages/AdminCountries/hooks/useColumns'
import { useFilters } from 'client/pages/AdminCountries/hooks/useFilters'

const AdminCountries: React.FC = () => {
  const columns = useColumns()
  const filters = useFilters()

  return <TablePaginated columns={columns} filters={filters} path={ApiEndPoint.Admin.countries()} />
}

export default AdminCountries
