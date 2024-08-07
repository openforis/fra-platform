import type { PieLabel } from 'recharts/types/polar/Pie'

import { Label } from 'meta/assessment'
import { ChartColor } from 'meta/chart'

type BarCell = {
  color: ChartColor
  label: Label
  unit?: string
  variableName: string
}

export type BarChartData = Array<Record<string, string | number>>

export type BarChart = {
  columns?: Array<string>
  cells: Array<BarCell>
  label?: PieLabel
  xAxis?: {
    label?: Label
  }
  yAxis?: {
    label?: Label
  }
}
