import { useMemo } from 'react'

import { DashboardItem } from 'meta/dashboard'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'

import { useDashboardMeta } from './useDashboardMeta'

export const useItems = (): Array<DashboardItem> => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  const dashboardMeta = useDashboardMeta()
  return useMemo<Array<DashboardItem>>(() => {
    return dashboardMeta[assessmentName][cycleName]
  }, [assessmentName, cycleName, dashboardMeta])
}
