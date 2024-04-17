import React from 'react'

import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

import { PieChart as PieChartType, PieChartData } from 'meta/chart'

type Props = {
  data: Array<PieChartData>
  chart: PieChartType
}
const ChartPie = (props: Props) => {
  const { data, chart } = props
  const { dataKey, label } = chart

  return (
    <PieChart height={400} width={400}>
      <Pie data={data} dataKey={dataKey} label={label} labelLine={false} outerRadius={80}>
        {data.map((entry) => (
          <Cell key={`cell-${entry.name}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  )
}

export default ChartPie
