import { DashboardBarChart } from 'meta/dashboard/barChart'
import { DashboardPieChart } from 'meta/dashboard/pieChart'
import { DashboardTable } from 'meta/dashboard/table'

export type Props = {
  items: Array<DashboardTable | DashboardPieChart | DashboardBarChart>
}
