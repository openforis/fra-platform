import { useMemo } from 'react'

import { DashboardItem } from 'meta/dashboard'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
import { DashboardMeta } from 'client/pages/CountryHome/Overview/meta/dashboardMeta'

export const useItems = (): Array<DashboardItem> => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  return useMemo<Array<DashboardItem>>(() => {
    return DashboardMeta[assessmentName][cycleName]
  }, [assessmentName, cycleName])
}
