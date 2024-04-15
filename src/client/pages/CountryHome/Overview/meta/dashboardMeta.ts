import { AssessmentName, AssessmentNames, CycleName } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'

import { forestGrowingStockAndCarbonDashboard2020 } from './forestGrowingStockAndCarbon/forestGrowingStockAndCarbonDashboard2020'
import { forestGrowingStockAndCarbonDashboard2025 } from './forestGrowingStockAndCarbon/forestGrowingStockAndCarbonDashboard2025'

const fra2020Dashboard: Array<DashboardItem> = [forestGrowingStockAndCarbonDashboard2020]
const fra2025Dashboard: Array<DashboardItem> = [forestGrowingStockAndCarbonDashboard2025]

type Dashboard = Record<AssessmentName, Record<CycleName, Array<DashboardItem>>>
export const DashboardMeta: Dashboard = {
  [AssessmentNames.fra]: {
    '2020': fra2020Dashboard,
    '2025': fra2025Dashboard,
  },
}
