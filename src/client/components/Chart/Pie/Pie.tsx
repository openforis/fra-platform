import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Cell, Legend, Pie as PieComponent, PieChart, ResponsiveContainer, Tooltip as TooltipRecharts } from 'recharts'

import { Labels } from 'meta/assessment/labels'
import { PieChartData } from 'meta/chart/pie'
import { Numbers } from 'utils/numbers'

import { cursor } from '../utils/cursor'
import Tooltip from './Tooltip'

type Props = {
  data: Array<PieChartData>
}

const Pie: React.FC<Props> = (props) => {
  const { data } = props

  const { t } = useTranslation()
  const totalValue = useMemo(() => data.reduce((sum, entry) => sum + entry.value || 0, 0), [data])

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
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <TooltipRecharts content={(props) => <Tooltip {...props} totalValue={totalValue} />} cursor={cursor} />
        <Legend
          align="center"
          formatter={(_, entry): string => {
            const { label, value } = entry.payload as PieChartData

            return `${Labels.getLabel({ label, t })} (${Numbers.format((value / totalValue) * 100, 0)}%)`
          }}
          itemSorter={null}
          layout="horizontal"
          verticalAlign="top"
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default Pie
