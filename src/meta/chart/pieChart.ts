import type { PieLabel } from 'recharts/types/polar/Pie'

import { ChartColor } from 'meta/chart/chart'

type PieCell = { variableName: string; color: ChartColor; columnName: string }

export type PieChartData = PieCell & { value: number }

export type PieChart = {
  cells: Array<PieCell>
  label: PieLabel
}
