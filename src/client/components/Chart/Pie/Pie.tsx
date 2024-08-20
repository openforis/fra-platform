import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Cell, Legend, Pie as PieComponent, PieChart, ResponsiveContainer, Tooltip as TooltipRecharts } from 'recharts'
import { Numbers } from 'utils/numbers'

import { Labels } from 'meta/assessment'
import { PieChartData } from 'meta/chart'

import { cursor } from '../utils/cursor'
import Tooltip from './Tooltip'

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
        <TooltipRecharts content={<Tooltip totalValue={totalValue} />} cursor={cursor} />
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
