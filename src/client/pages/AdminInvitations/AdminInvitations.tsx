import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryAdmin } from 'meta/area'

import CountryLink from 'client/components/CountryLink'
import TablePaginated, { Column } from 'client/components/TablePaginated'

const useColumns = (): Array<Column<CountryAdmin>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<any>>>(
    () => [
      {
        component: ({ datum }) => <CountryLink countryIso={datum.countryIso} />,
        header: t('common.country'),
        key: 'country',
      },
      {
        component: ({ datum: _datum }) => <span>email</span>,
        header: t('common.email'),
        key: 'email',
      },
      {
        component: ({ datum: _datum }) => <span>role</span>,
        header: t('common.role'),
        key: 'role',
      },
      {
        component: ({ datum: _datum }) => <span>invited</span>,
        header: t('common.invited'),
        key: 'invited',
      },
      {
        component: ({ datum: _datum }) => <span>accepted</span>,
        header: t('common.accepted'),
        key: 'accepted',
      },
      {
        component: ({ datum: _datum }) => <span>expired</span>,
        header: t('common.expired'),
        key: 'expired',
      },
    ],
    [t]
  )
}

const AdminInvitations: React.FC = () => {
  const columns = useColumns()

  return <TablePaginated columns={columns} path={ApiEndPoint.User.invitations()} />
}

export default AdminInvitations
