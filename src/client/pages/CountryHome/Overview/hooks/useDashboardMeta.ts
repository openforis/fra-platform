import { useMemo } from 'react'

import { AssessmentName, AssessmentNames, Cycle, CycleName } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'

import { useCycle } from 'client/store/assessment'

import { forestGrowingStockAndCarbonDashboard2020 } from '../meta/forestGrowingStockAndCarbon/forestGrowingStockAndCarbonDashboard2020'
import { forestGrowingStockAndCarbonDashboard2025 } from '../meta/forestGrowingStockAndCarbon/forestGrowingStockAndCarbonDashboard2025'

const fra2020Dashboard = (cycle: Cycle): Array<DashboardItem> => [forestGrowingStockAndCarbonDashboard2020(cycle)]
const fra2025Dashboard = (cycle: Cycle): Array<DashboardItem> => [forestGrowingStockAndCarbonDashboard2025(cycle)]

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
