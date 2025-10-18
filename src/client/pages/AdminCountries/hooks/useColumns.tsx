import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Dates } from 'utils/dates'

import { CountrySummary } from 'meta/area'

import CountryLink from 'client/components/CountryLink'
import CountryStatusIndicator from 'client/components/CountryStatusIndicator'
import { Column } from 'client/components/TablePaginated'

const DateCell: React.FC<{ date: string }> = (props) => {
  const { date } = props
  const { i18n } = useTranslation()

  return <span>{date ? Dates.getRelativeDate(date, i18n) : '-'}</span>
}

type Returned = Array<Column<CountrySummary>>

export const useColumns = (): Returned => {
  const { t } = useTranslation()

  return useMemo<Returned>(
    () => [
      {
        component: ({ datum }) => <CountryLink countryIso={datum.countryIso} />,
        header: t('common.country'),
        key: 'country',
        orderByProperty: 'country_name',
      },
      {
        component: ({ datum: { status } }) => <CountryStatusIndicator status={status} />,
        header: t('common.status'),
        key: 'status',
        orderByProperty: 'status',
      },
      {
        component: ({ datum: { lastEdit } }) => <DateCell date={lastEdit} />,
        header: t('common.lastEdit'),
        key: 'lastEdit',
        orderByProperty: 'last_edit',
      },
      {
        component: ({ datum: { lastInReview } }) => <DateCell date={lastInReview} />,
        header: t('common.submittedToReview'),
        key: 'lastInReview',
        orderByProperty: 'last_in_review',
      },
      {
        component: ({ datum: { lastInApproval } }) => <DateCell date={lastInApproval} />,
        header: t('common.submittedForApproval'),
        key: 'lastInApproval',
        orderByProperty: 'last_in_approval',
      },
      {
        component: ({ datum: { lastInAccepted } }) => <DateCell date={lastInAccepted} />,
        header: t('common.accepted'),
        key: 'lastInAccepted',
        orderByProperty: 'last_in_accepted',
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
    [t]
  )
}
