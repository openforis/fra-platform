import { PieChart } from 'meta/chart/pie'
import { DashboardItem, DashboardItemType } from 'meta/dashboard/item'

export type DashboardPieChart = DashboardItem<DashboardItemType.pieChart> & { chart: PieChart }
