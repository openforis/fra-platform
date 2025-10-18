import React, { useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useLanguage } from 'client/hooks/language'
import TablePaginated from 'client/components/TablePaginated'
import { useColumns } from 'client/pages/AdminCountries/hooks/useColumns'
import { useFilters } from 'client/pages/AdminCountries/hooks/useFilters'

const AdminCountries: React.FC = () => {
  const columns = useColumns()
  const filters = useFilters()
  const lang = useLanguage()
  const path = useMemo<string>(() => `${ApiEndPoint.Admin.countries()}?lang=${lang}`, [lang])

  return <TablePaginated columns={columns} filters={filters} path={path} />
}

export default AdminCountries
