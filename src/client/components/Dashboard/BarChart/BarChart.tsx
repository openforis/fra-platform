import React from 'react'

import { DashboardBarChart } from 'meta/dashboard/dashboard'

import Bar from 'client/components/Chart/Bar'

import { useBarChartData } from './hooks/useBarChartData'

type Props = {
  item: DashboardBarChart
}

const BarChart: React.FC<Props> = (props: Props) => {
  const {
    item: { table, chart },
  } = props

  const data = useBarChartData(table, chart)

  return <Bar chart={chart} data={data} />
}

export default BarChart
