import React from 'react'

import { Cell, Legend, Pie as PieComponent, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { PieChart as PieChartType, PieChartData } from 'meta/chart'

type Props = {
  data: Array<PieChartData>
  chart: PieChartType
}
const Pie = (props: Props) => {
  const { data, chart } = props
  const { label } = chart

  return (
    <ResponsiveContainer height={300} width="100%">
      <PieChart>
        <PieComponent
          data={data}
          dataKey="value"
          label={label}
          labelLine={false}
          nameKey="variableName"
          outerRadius={80}
          paddingAngle={1}
        >
          {data.map((entry) => (
            <Cell key={`cell-${entry.variableName}`} fill={entry.color} />
          ))}
        </PieComponent>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Pie
