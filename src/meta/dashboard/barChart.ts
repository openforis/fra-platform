import { BarChart } from 'meta/chart/bar'
import { DashboardItem, DashboardItemType } from 'meta/dashboard/item'

export type DashboardBarChart = DashboardItem<DashboardItemType.barChart> & { chart: BarChart }
