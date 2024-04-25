import React from 'react'
import { useTranslation } from 'react-i18next'

import { Bar as BarComponent, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Numbers } from 'utils/numbers'

import { Labels } from 'meta/assessment'
import { BarChart as BarChartType, BarChartData } from 'meta/chart'

type Props = {
  data: BarChartData
  chart: BarChartType
}

const Bar = (props: Props) => {
  const { t } = useTranslation()
  const { data, chart } = props

  return (
    <ResponsiveContainer height={300} width="100%">
      <BarChart data={data}>
        <XAxis
          dataKey="columnName"
          label={{ value: Labels.getLabel({ label: chart.xAxis?.label, t }), position: 'insideBottom' }}
        />
        <YAxis
          label={{ value: Labels.getLabel({ label: chart.yAxis?.label, t }), angle: -90, position: 'insideLeft' }}
          tickFormatter={(value) => {
            return value.toLocaleString()
          }}
        />
        <Tooltip
          formatter={(value) => {
            return Numbers.format(value as number)
          }}
        />
        <Legend />
        {chart.cells.map((cell) => {
          return (
            <BarComponent
              key={`bar_${cell.variableName}`}
              dataKey={cell.variableName}
              fill={cell.color}
              name={Labels.getLabel({ label: cell.label, t })}
              unit={`${cell.unit ? ` (${t(cell.unit)})` : ''}`}
            />
          )
        })}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Bar
