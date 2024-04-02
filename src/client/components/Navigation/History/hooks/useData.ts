import { ApiEndPoint } from 'meta/api/endpoint'
import { ActivityLog, ActivityLogMessage } from 'meta/assessment'

import { useTablePaginatedData } from 'client/store/ui/tablePaginated'
import { useSectionRouteParams } from 'client/hooks/useRouteParams'

// TODO: Implement end point and store actions
const path = ApiEndPoint.CycleData.activities()
export const useData = () => {
  const { sectionName } = useSectionRouteParams()
  const data = useTablePaginatedData<ActivityLog<never>>(path)

  return data?.filter((d) => d.message === ActivityLogMessage.descriptionUpdate && d.section === sectionName)
}
