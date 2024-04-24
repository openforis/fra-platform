import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cell, Legend, Pie as PieComponent, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Numbers } from 'utils/numbers'

import { Labels } from 'meta/assessment'
import { PieChartData } from 'meta/chart'

type Props = {
  data: Array<PieChartData>
}

const Pie = (props: Props) => {
  const { data } = props
  const { t } = useTranslation()

  return (
    <ResponsiveContainer height={300} width="100%">
      <PieChart>
        <PieComponent
          data={data}
          dataKey="value"
          label={({ percent, label }) => {
            return `${Labels.getLabel({ label, t })} (${(percent * 100).toFixed(0)}%)`
          }}
          labelLine={false}
          nameKey="variableName"
          outerRadius={80}
          paddingAngle={1}
        >
          {data.map((cell) => (
            <Cell
              key={`cell-${cell.variableName}`}
              fill={cell.color}
              name={Labels.getLabel({ label: cell.label, t })}
            />
          ))}
        </PieComponent>
        <Tooltip
          formatter={(value, _, { payload }) => {
            const { label } = payload
            return [Numbers.format(value as number), Labels.getLabel({ label, t })]
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Pie
