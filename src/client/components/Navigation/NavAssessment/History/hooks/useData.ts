import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog } from 'meta/assessment'

import { useTablePaginatedData } from 'client/store/ui/tablePaginated'

const path = ApiEndPoint.CycleData.activities()

export const useData = () => {
  const data = useTablePaginatedData<ActivityLog<never>>(path)
  return data
}
