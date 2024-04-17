import type { PieLabel } from 'recharts/types/polar/Pie'

import { ChartColor } from 'meta/chart/chart'

export type PieChartData = {
  name: string
  value: number
  color: string
}

type PieCell = { key: string; color: ChartColor }

export type PieChart = {
  dataKey: string
  cells: Array<PieCell>
  label: PieLabel
}
