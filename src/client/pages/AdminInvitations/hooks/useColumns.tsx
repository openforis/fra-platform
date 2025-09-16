import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { Users } from 'meta/user'
import { UserInvitationSummary } from 'meta/user/userInvitationSummary'

import CountryLink from 'client/components/CountryLink'
import { Column } from 'client/components/TablePaginated'
import Expired from 'client/pages/AdminInvitations/Expired'

const dateformat = 'yyyy-MM-dd HH:mm:ss'
const formatDateTime = (date: string): string => {
  if (!date) return '-'
  return Dates.format(Dates.parseISO(date), dateformat)
}

export const useColumns = (): Array<Column<UserInvitationSummary>> => {
  const { t } = useTranslation()

  return useMemo<Array<Column<UserInvitationSummary>>>(
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
        component: ({ datum }) => <Expired userInvitation={datum} />,
        header: t('common.expired'),
        key: 'expired',
      },
    ],
    [t]
  )
}
