import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { ApiEndPoint } from 'meta/api/endpoint'
import { Users } from 'meta/user'
import { RoleAdmin } from 'meta/user/roleAdmin'

import CountryLink from 'client/components/CountryLink'
import TablePaginated, { Column } from 'client/components/TablePaginated'
import Expired from 'client/pages/AdminInvitations/Expired'

const dateformat = 'yyyy-MM-dd HH:mm:ss'
const formatDateTime = (date: string) => {
  if (!date) return '-'
  return Dates.format(Dates.parseISO(date), dateformat)
}

const useColumns = (): Array<Column<RoleAdmin>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<RoleAdmin>>>(
    () => [
      {
        component: ({ datum }) => (datum.countryIso ? <CountryLink countryIso={datum.countryIso} /> : <span>-</span>),
        header: t('common.country'),
        key: 'country',
      },
      {
        component: ({ datum }) => <span>{datum.email}</span>,
        header: t('common.email'),
        key: 'email',
        orderByProperty: 'u.email',
      },
      {
        component: ({ datum }) => <span>{t(Users.getI18nRoleLabelKey(datum.role))}</span>,
        header: t('common.role'),
        key: 'role',
        orderByProperty: 'role',
      },
      {
        component: ({ datum }) => <span>{formatDateTime(datum.invitedAt)}</span>,
        header: t('common.invited'),
        key: 'invited_at',
        orderByProperty: 'invited_at',
      },
      {
        component: ({ datum }) => <span>{formatDateTime(datum.acceptedAt)}</span>,
        header: t('common.accepted'),
        key: 'accepted_at',
        orderByProperty: 'accepted_at',
      },
      {
        component: ({ datum }) => <Expired role={datum} />,
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
