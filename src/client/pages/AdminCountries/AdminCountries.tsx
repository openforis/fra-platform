import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryAdmin } from 'meta/area'

import TablePaginated, { Column } from 'client/components/TablePaginated'

const useColumns = (): Array<Column<CountryAdmin>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<CountryAdmin>>>(
    () => [
      {
        component: ({ datum }) => <div>{datum.countryIso}</div>,
        header: t('admin.country'),
        key: 'country',
      },
    ],
    [t]
  )
}

const AdminCountries: React.FC = () => {
  const columns = useColumns()

  return <TablePaginated columns={columns} path={ApiEndPoint.Admin.countries()} />
}

export default AdminCountries
