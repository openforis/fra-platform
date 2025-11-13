import { Label } from 'meta/assessment/label'
import { ChartColor } from 'meta/chart/color'

type PieCell = {
  color: ChartColor
  columnName: string
  label?: Label
  unit?: string
  variableName: string
}

export type PieChartData = PieCell & {
  value: number
}

export type PieChart = {
  cells: Array<PieCell>
}
