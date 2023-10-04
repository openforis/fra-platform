import { useMemo } from 'react'

import { ActivityLog } from 'meta/assessment'

import { Column } from 'client/components/TablePaginated'
import RecentActivityItem from 'client/pages/CountryHome/FraHome/RecentActivity/RecentActivityItem'

export const useColumns = (): Array<Column<ActivityLog<never>>> => {
  return useMemo<Array<Column<ActivityLog<never>>>>(
    () => [
      {
        component: RecentActivityItem,
        key: 'activity-log',
      },
    ],
    []
  )
}
