import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Areas, CountryAdmin } from 'meta/area'

import TablePaginated, { Column } from 'client/components/TablePaginated'
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
        component: ({ datum: { edited: lastEdit } }) => (
          <span>{lastEdit ? Dates.getRelativeDate(lastEdit, i18n) : '-'}</span>
        ),
        header: t('common.lastEdit'),
        key: 'edited',
      },
      {
        component: ({ datum }) => <span>{datum.invitationsAcceptedCount}</span>,
        header: t('common.invitationsAcceptedCount'),
        key: 'invitationsAcceptedCount',
      },
      {
        component: ({ datum }) => <span>{datum.invitationsSentCount}</span>,
        header: t('common.invitationsSentCount'),
        key: 'invitationsSentCount',
      },
      {
        component: ({ datum: { status } }) => <CountryStatus status={status} />,
        header: t('common.status'),
        key: 'status',
      },
      { component: ({ datum }) => <span>{datum.usersCount}</span>, header: t('common.usersCount'), key: 'usersCount' },
    ],
    [i18n, t]
  )
}

const AdminCountries: React.FC = () => {
  const columns = useColumns()

  return <TablePaginated className="admin-countries" columns={columns} path={ApiEndPoint.Admin.countries()} />
}

export default AdminCountries
