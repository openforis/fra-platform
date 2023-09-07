import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Areas, CountryAdmin } from 'meta/area'

import TablePaginated, { Column } from 'client/components/TablePaginated'
import CountryLink from 'client/pages/AdminCountries/components/CountryLink'
import CountryStatus from 'client/pages/AdminCountries/components/CountryStatus'
import { Dates } from 'client/utils'

const useColumns = (): Array<Column<CountryAdmin>> => {
  const { t, i18n } = useTranslation()

  return useMemo<Array<Column<CountryAdmin>>>(
    () => [
      {
        component: ({ datum }) => <span>{t(Areas.getTranslationKey(datum.countryIso))}</span>,
        header: t('common.country'),
        key: 'country',
      },
      {
        component: ({ datum: { status } }) => <CountryStatus status={status} />,
        header: t('common.status'),
        key: 'status',
      },
      {
        component: ({ datum: { lastEdit } }) => <span>{lastEdit ? Dates.getRelativeDate(lastEdit, i18n) : '-'}</span>,
        header: t('common.lastEdit'),
        key: 'lastEdit',
      },
      { component: ({ datum }) => <span>{datum.usersCount}</span>, header: t('admin.usersCount'), key: 'usersCount' },
      {
        component: ({ datum }) => <span>{datum.invitationsSentCount}</span>,
        header: t('admin.invitationsSentCount'),
        key: 'invitationsSentCount',
      },
      {
        component: ({ datum }) => <span>{datum.invitationsAcceptedCount}</span>,
        header: t('admin.invitationsAcceptedCount'),
        key: 'invitationsAcceptedCount',
      },
      {
        component: ({ datum }) => <CountryLink countryIso={datum.countryIso} />,
        header: '',
        key: 'link',
      },
    ],
    [i18n, t]
  )
}

const AdminCountries: React.FC = () => {
  const columns = useColumns()

  return <TablePaginated className="admin-countries" columns={columns} path={ApiEndPoint.Admin.countries()} />
}

export default AdminCountries