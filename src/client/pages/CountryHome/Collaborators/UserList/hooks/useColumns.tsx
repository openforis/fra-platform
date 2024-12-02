import React, { useMemo } from 'react'

import { CountryUserSummary } from 'meta/user'

import { Column } from 'client/components/TablePaginated'

import UserCard from '../UserCard'

export const useColumns = (): Array<Column<CountryUserSummary>> => {
  return useMemo<Array<Column<CountryUserSummary>>>(
    () => [
      {
        header: '',
        key: 'info',
        component: ({ datum }) => <UserCard user={datum} />,
      },
    ],
    []
  )
}
