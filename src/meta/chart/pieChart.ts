import { Label } from 'meta/assessment'
import { ChartColor } from 'meta/chart'

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
