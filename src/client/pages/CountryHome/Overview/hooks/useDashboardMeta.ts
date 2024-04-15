import { useMemo } from 'react'

import { AssessmentName, AssessmentNames, Cycle, CycleName } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'

import { useCycle } from 'client/store/assessment'
import { forestGrowingStockAndCarbonDashboard } from 'client/pages/CountryHome/Overview/meta/forestGrowingStockAndCarbon'

const fra2020Dashboard = (cycle: Cycle): Array<DashboardItem> => [forestGrowingStockAndCarbonDashboard(cycle)]
const fra2025Dashboard = (cycle: Cycle): Array<DashboardItem> => [forestGrowingStockAndCarbonDashboard(cycle)]

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
