import { ActivityLog } from 'meta/assessment'

import { useTablePaginatedData } from 'client/store/ui/tablePaginated'
import { usePath } from 'client/components/Navigation/NavAssessment/History/hooks/usePath'

export const useData = (sectionKey: string): Array<ActivityLog<never>> => {
  const path = usePath(sectionKey)
  return useTablePaginatedData<ActivityLog<never>>(path)
}
