import React, { useMemo } from 'react'
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
  const totalValue = useMemo(() => data.reduce((sum, entry) => sum + entry.value, 0), [data])

  return (
    <ResponsiveContainer height={300} width="100%">
      <PieChart>
        <PieComponent
          data={data}
          dataKey="value"
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
            const { label, unit } = payload
            const _label = Labels.getLabel({ label, t })
            let _value = Numbers.format(value as number)
            if (unit) _value += ` (${t(unit)})`
            const percent = ((value as number) / totalValue) * 100
            const _percent = ` (${Numbers.format(percent, 0)}%)`
            return [_value + _percent, _label]
          }}
        />
        <Legend
          align="center"
          // @ts-ignore
          formatter={(value, entry: { payload: { percent: number } }) => {
            return `${value} (${Numbers.format(entry.payload.percent * 100, 0)}%)`
          }}
          layout="horizontal"
          verticalAlign="top"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Pie
