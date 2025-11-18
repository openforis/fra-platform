import React, { useMemo } from 'react'

import { UserCountrySummary } from 'meta/user/countrySummary'

import { Column } from 'client/components/TablePaginated'

import UserCard from '../UserCard'

export const useColumns = (): Array<Column<UserCountrySummary>> => {
  return useMemo<Array<Column<UserCountrySummary>>>(
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
