import { useMemo } from 'react'

import { AssessmentName, AssessmentNames, CycleName } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard/dashboard'

import { useCycleRouteParams } from 'client/hooks/useRouteParams'
// import { DashboardMeta } from 'client/pages/CountryHome/Dashboard/meta/dashboardMeta'

type Dashboard = Record<AssessmentName, Record<CycleName, Array<DashboardItem>>>
const DashboardMeta: Dashboard = { [AssessmentNames.fra]: { '2025': [] } }

export const useItems = (): Array<DashboardItem> => {
  const { assessmentName, cycleName } = useCycleRouteParams()
  return useMemo<Array<DashboardItem>>(() => {
    return DashboardMeta[assessmentName][cycleName]
  }, [assessmentName, cycleName])
}
