import { DashboardItem } from 'meta/dashboard'

import { MetadataSelectors } from 'client/store/metadata/selectors'
import { useAppSelector } from 'client/store/store'
import { useCycleRouteParams } from 'client/hooks/useRouteParams'

export const useDashboardItems = (): Array<DashboardItem> => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  return useAppSelector((state) => MetadataSelectors.getDashboard(state, assessmentName, cycleName))
}
