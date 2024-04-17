import { Label, Table } from 'meta/assessment'
import { PieChart } from 'meta/chart'

export enum DashboardItemType {
  table = 'table',
  pieChart = 'pieChart',
  barChart = 'barChart',
}

export type DashboardItem<Type = DashboardItemType> = {
  type: Type
  title: Label
}

export type DashboardTable = DashboardItem<DashboardItemType.table> & { table: Table }

export type DashboardPieChart = DashboardItem<DashboardItemType.pieChart> & { table: Table; chart: PieChart }
// export type DashboardBarChart = DashboardItem<DashboardItemType.barChart> & { chart: BarChart }
