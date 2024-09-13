import './Bar.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  Bar as BarComponent,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as TooltipRecharts,
  XAxis,
  YAxis,
} from 'recharts'

import { Labels } from 'meta/assessment'
import { BarChart as BarChartType, BarChartData } from 'meta/chart'

import { cursor } from '../utils/cursor'
import Tooltip from './Tooltip'

type Props = {
  data: BarChartData
  chart: BarChartType
  showLegend?: boolean
  showLabels?: boolean
  stacked?: boolean
}

const SPACING = 8

const Bar = (props: Props) => {
  const { t } = useTranslation()
  const { data, chart, showLegend, showLabels, stacked } = props

  let yAxisLabel
  let xAxisLabel

  if (showLabels) {
    yAxisLabel = {
      angle: -90,
      dx: -SPACING / 2,
      position: 'insideLeft',
      value: Labels.getLabel({ label: chart.yAxis?.label, t }),
    }

    xAxisLabel = { value: Labels.getLabel({ label: chart.xAxis?.label, t }), position: 'insideBottom', offset: -10 }
  }

  return (
    <ResponsiveContainer height={300} width="100%">
      <BarChart barCategoryGap={5} data={data} margin={{ left: SPACING / 2, right: SPACING, top: SPACING, bottom: 10 }}>
        <CartesianGrid stroke="#dadada" strokeDasharray="1" />
        <XAxis dataKey="columnName" label={xAxisLabel} stroke="#7f7f7f" />
        <YAxis
          label={yAxisLabel}
          stroke="#7f7f7f"
          tickFormatter={(value) => {
            return value.toLocaleString()
          }}
        />

        <TooltipRecharts content={Tooltip} cursor={cursor} shared={false} />

        {showLegend && (
          <Legend align="center" layout="horizontal" verticalAlign="top" wrapperStyle={{ paddingBottom: '16px' }} />
        )}

        {chart.cells.map((cell) => {
          return (
            <BarComponent
              key={`bar_${cell.variableName}`}
              dataKey={cell.variableName}
              fill={cell.color}
              maxBarSize={70}
              name={Labels.getLabel({ label: cell.label, t })}
              stackId={stacked ? 'stacked' : undefined}
              unit={`${cell.unit ? `${t(cell.unit)}` : ''}`}
            />
          )
        })}
      </BarChart>
    </ResponsiveContainer>
  )
}

Bar.defaultProps = {
  showLegend: true,
  showLabels: true,
  stacked: false,
}

export default Bar
