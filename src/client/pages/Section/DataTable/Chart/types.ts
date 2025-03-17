import { ScaleLinear, Selection } from 'd3'

import { Table } from 'meta/assessment'
import { ODPDataSourceMethod } from 'meta/assessment/originalDataPoint'
import { RecordAssessmentData } from 'meta/data'

// component
export type ChartProps = {
  data: RecordAssessmentData
  table: Table
  width: number
}

// trend definition
export type TrendName = string
export type Trend = {
  color: string
  label: string
  name: TrendName
}

export type Trends = Array<Trend>

// trend data
export type TrendDatum = {
  dataSourceMethods?: Array<ODPDataSourceMethod> // TODO: IT seems this property doesn't exist now
  estimated: boolean
  type: 'fra' | 'odp' // ??
  value: number
  year: number
}
export type TrendData = Array<TrendDatum>
export type RecordTrendData = Record<TrendName, TrendData>

export type TrendsYears = {
  all: Array<number>
  max?: number
  min?: number
}

// d3 types
export type D3ChartAxisScale = ScaleLinear<number, number>
export type D3YAxis = Selection<SVGGElement, unknown, SVGGElement, unknown>
