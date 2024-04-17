import React from 'react'

import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

import { PieChart as PieChartType } from 'meta/chart'
import { RecordAssessmentData } from 'meta/data'

import { useChartData } from 'client/components/Chart/ChartPie/hooks/useChartData'

type Props = {
  data: RecordAssessmentData
  chart: PieChartType
}
const ChartPie = (props: Props) => {
  const { data: dataProp, chart } = props
  const { dataKey, label } = chart

  const data = useChartData(dataProp, chart)

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
