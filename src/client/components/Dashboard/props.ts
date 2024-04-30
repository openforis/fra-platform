import { DashboardTable } from 'meta/dashboard'
import { DashboardBarChart, DashboardPieChart } from 'meta/dashboard/dashboard'

export type Props = {
  items: Array<DashboardTable | DashboardPieChart | DashboardBarChart>
}
