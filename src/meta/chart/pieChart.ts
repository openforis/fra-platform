import type { PieLabel } from 'recharts/types/polar/Pie'

import { Label } from 'meta/assessment'
import { ChartColor } from 'meta/chart'

type PieCell = { variableName: string; color: ChartColor; columnName: string; unit?: string; label?: Label }

export type PieChartData = PieCell & { value: number }

export type PieChart = {
  cells: Array<PieCell>
  label: PieLabel
}
