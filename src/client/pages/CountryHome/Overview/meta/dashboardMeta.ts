import { AssessmentName, AssessmentNames, CycleName } from 'meta/assessment'
import { DashboardItem } from 'meta/dashboard'

import { forestGrowingStockAndCarbonDashboard } from 'client/pages/CountryHome/Overview/meta/forestGrowingStockAndCarbonDashboard'

const fra2020Dashboard: Array<DashboardItem> = [forestGrowingStockAndCarbonDashboard]
const fra2025Dashboard: Array<DashboardItem> = fra2020Dashboard

type Dashboard = Record<AssessmentName, Record<CycleName, Array<DashboardItem>>>
export const DashboardMeta: Dashboard = {
  [AssessmentNames.fra]: {
    '2020': fra2020Dashboard,
    '2025': fra2025Dashboard,
  },
}
