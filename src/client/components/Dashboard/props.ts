import { DashboardBarChart, DashboardPieChart, DashboardTable } from 'meta/dashboard/dashboard'

export type Props = {
  items: Array<DashboardTable | DashboardPieChart | DashboardBarChart>
}
