import React from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import TablePaginated from 'client/components/TablePaginated'
import { useColumns } from 'client/pages/AdminCountries/hooks/useColumns'
import { useFilters } from 'client/pages/AdminCountries/hooks/useFilters'
import { useRefetchCountries } from 'client/pages/AdminCountries/hooks/useRefetchCountries'

const AdminCountries: React.FC = () => {
  const columns = useColumns()
  const filters = useFilters()
  const path = ApiEndPoint.Admin.countries()

  useRefetchCountries({ path })

  return <TablePaginated columns={columns} filters={filters} path={path} />
}

export default AdminCountries
