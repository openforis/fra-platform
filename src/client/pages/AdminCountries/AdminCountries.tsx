import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryAdmin } from 'meta/area'

import CountryStatusIndicator from 'client/components/CountryStatusIndicator'
import TablePaginated, { Column } from 'client/components/TablePaginated'
import CountryLink from 'client/pages/AdminCountries/CountryLink'
import { Dates } from 'client/utils'

const useColumns = (): Array<Column<CountryAdmin>> => {
  const { t, i18n } = useTranslation()

  return useMemo<Array<Column<CountryAdmin>>>(
    () => [
      {
        component: ({ datum }) => <CountryLink countryIso={datum.countryIso} />,
        header: t('common.country'),
        key: 'country',
      },
      {
        component: ({ datum: { status } }) => <CountryStatusIndicator status={status} />,
        header: t('common.status'),
        key: 'status',
        orderByProperty: 'status',
      },
      {
        component: ({ datum: { lastEdit } }) => <span>{lastEdit ? Dates.getRelativeDate(lastEdit, i18n) : '-'}</span>,
        header: t('common.lastEdit'),
        key: 'lastEdit',
        orderByProperty: 'last_edit',
      },
      {
        component: ({ datum }) => <span>{datum.usersCount}</span>,
        header: t('admin.usersCount'),
        key: 'usersCount',
        orderByProperty: 'users_count',
      },
      {
        component: ({ datum }) => <span>{datum.invitationsSentCount}</span>,
        header: t('admin.invitationsSentCount'),
        key: 'invitationsSentCount',
        orderByProperty: 'invitations_sent_count',
      },
      {
        component: ({ datum }) => <span>{datum.invitationsAcceptedCount}</span>,
        header: t('admin.invitationsAcceptedCount'),
        key: 'invitationsAcceptedCount',
        orderByProperty: 'invitations_accepted_count',
      },
    ],
    [i18n, t]
  )
}

const AdminCountries: React.FC = () => {
  const columns = useColumns()

  return <TablePaginated columns={columns} path={ApiEndPoint.Admin.countries()} />
}

export default AdminCountries
