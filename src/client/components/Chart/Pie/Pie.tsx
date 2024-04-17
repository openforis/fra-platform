import React from 'react'

import { Cell, Legend, Pie as PieComponent, PieChart, Tooltip } from 'recharts'

import { PieChart as PieChartType, PieChartData } from 'meta/chart'

type Props = {
  data: Array<PieChartData>
  chart: PieChartType
}
const Pie = (props: Props) => {
  const { data, chart } = props
  const { label } = chart

  return (
    <PieChart height={400} width={400}>
      <PieComponent data={data} dataKey="value" label={label} labelLine={false} nameKey="variableName" outerRadius={80}>
        {data.map((entry) => (
          <Cell key={`cell-${entry.variableName}`} fill={entry.color} />
        ))}
      </PieComponent>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

export default Pie
