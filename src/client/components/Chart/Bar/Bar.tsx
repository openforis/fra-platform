import './Bar.scss'
import React from 'react'
import { useTranslation } from 'react-i18next'

import {
  Bar as BarComponent,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { Labels } from 'meta/assessment'
import { BarChart as BarChartType, BarChartData } from 'meta/chart'

import TooltipContent from 'client/components/Chart/TooltipContent'

type Props = {
  data: BarChartData
  chart: BarChartType
  showLegend?: boolean
}

const SPACING = 8

const Bar = (props: Props) => {
  const { t } = useTranslation()
  const { data, chart, showLegend } = props

  return (
    <ResponsiveContainer height={300} width="100%">
      <BarChart barCategoryGap={5} data={data} margin={{ left: SPACING / 2, right: SPACING, top: SPACING, bottom: 10 }}>
        <CartesianGrid stroke="#dadada" strokeDasharray="1" />
        <XAxis
          dataKey="columnName"
          label={{ value: Labels.getLabel({ label: chart.xAxis?.label, t }), position: 'insideBottom', offset: -10 }}
          stroke="#7f7f7f"
        />
        <YAxis
          label={{
            angle: -90,
            dx: -SPACING / 2,
            position: 'insideLeft',
            value: Labels.getLabel({ label: chart.yAxis?.label, t }),
          }}
          stroke="#7f7f7f"
          tickFormatter={(value) => {
            return value.toLocaleString()
          }}
        />

        <Tooltip
          content={TooltipContent}
          cursor={{ fill: '#f3fdff', stroke: '#9eb9bd', strokeWidth: 1 }}
          shared={false}
        />

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
              unit={`${cell.unit ? ` (${t(cell.unit)})` : ''}`}
            />
          )
        })}
      </BarChart>
    </ResponsiveContainer>
  )
}

Bar.defaultProps = {
  showLegend: true,
}

export default Bar
