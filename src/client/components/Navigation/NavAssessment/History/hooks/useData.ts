import { ActivityLog } from 'meta/assessment'
import { HistoryTarget } from 'meta/cycleData'

import { useTablePaginatedData } from 'client/store/ui/tablePaginated'

import { usePath } from './usePath'

export const useData = (target: HistoryTarget): Array<ActivityLog<never>> => {
  const path = usePath(target)

  return useTablePaginatedData<ActivityLog<never>>(path)
}
