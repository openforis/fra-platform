import { useMemo } from 'react'

import { AssessmentName, AssessmentNames, Cycle, CycleName } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'

import { useCycle } from 'client/store/assessment'
import { forestAreaPercentOfLandArea } from 'client/pages/CountryHome/Overview/meta/forestAreaPercentOfLandArea'
import { forestAreaWithinProtectedAreas } from 'client/pages/CountryHome/Overview/meta/forestAreaWithinProtectedAreas'
import { forestGrowingStockAndCarbonDashboard } from 'client/pages/CountryHome/Overview/meta/forestGrowingStockAndCarbon'
import { primaryDesignatedManagementObjectiveDashboard } from 'client/pages/CountryHome/Overview/meta/primaryDesignatedManagementObjective'
import { primaryForestPercentOfForestArea } from 'client/pages/CountryHome/Overview/meta/primaryForestPercentOfForestArea'

const fra2020Dashboard = (cycle: Cycle): Array<DashboardItem> => [
  forestGrowingStockAndCarbonDashboard(cycle),
  forestAreaPercentOfLandArea(cycle),
  primaryForestPercentOfForestArea(cycle),
  forestAreaWithinProtectedAreas(cycle),
  primaryDesignatedManagementObjectiveDashboard(cycle),
]
const fra2025Dashboard = (cycle: Cycle): Array<DashboardItem> => [
  forestGrowingStockAndCarbonDashboard(cycle),
  forestAreaPercentOfLandArea(cycle),
  primaryForestPercentOfForestArea(cycle),
  forestAreaWithinProtectedAreas(cycle),
  primaryDesignatedManagementObjectiveDashboard(cycle),
]

export type Dashboard = Record<AssessmentName, Record<CycleName, Array<DashboardItem>>>

export const useDashboardMeta = (): Dashboard => {
  const cycle = useCycle()

  return useMemo<Dashboard>(() => {
    return {
      [AssessmentNames.fra]: {
        '2020': fra2020Dashboard(cycle),
        '2025': fra2025Dashboard(cycle),
      },
    }
  }, [cycle])
}
