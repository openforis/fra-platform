import React, { useMemo } from 'react'

import { ActivityLog } from 'meta/assessment'

import { Column } from 'client/components/TablePaginated'
import RecentActivityItem from 'client/pages/CountryHome/FraHome/RecentActivity/RecentActivityItem'

export const useColumns = (): Array<Column<ActivityLog<any>>> => {
  return useMemo<Array<Column<ActivityLog<any>>>>(
    () => [
      {
        component: ({ datum }) => <RecentActivityItem activity={datum} />,
        key: 'activity-log',
      },
    ],
    []
  )
}
