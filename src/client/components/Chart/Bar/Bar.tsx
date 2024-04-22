import React from 'react'

import { Bar as BarComponent, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { BarChart as BarChartType, BarChartData } from 'meta/chart'

type Props = {
  data: BarChartData
  chart: BarChartType
}

const Bar = (props: Props) => {
  const { data, chart } = props

  return (
    <ResponsiveContainer height={300} width="100%">
      <BarChart data={data}>
        <XAxis dataKey="columnName" />
        <YAxis />
        <Tooltip />
        <Legend />
        {chart.cells.map((cell) => {
          return <BarComponent key={`bar_${cell.variableName}`} dataKey={cell.variableName} fill={cell.color} />
        })}
      </BarChart>
    </ResponsiveContainer>
  )
}

export default Bar
