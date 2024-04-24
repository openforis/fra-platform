import { Label } from 'meta/assessment'
import { ChartColor } from 'meta/chart'

type PieCell = { variableName: string; color: ChartColor; columnName: string; label?: Label; unit?: string }

export type PieChartData = PieCell & { value: number }

export type PieChart = {
  cells: Array<PieCell>
}
