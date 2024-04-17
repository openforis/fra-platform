import React from 'react'

import { DashboardPieChart } from 'meta/dashboard/dashboard'

import ChartPie from 'client/components/Chart/ChartPie'

import { useChartData } from '../hooks/useChartData'
import { useGetTableData } from '../hooks/useGetTableData'

type Props = {
  item: DashboardPieChart
}

const Pie: React.FC<Props> = (props: Props) => {
  const {
    item: { table, chart },
  } = props

  const data = useChartData(table, chart)
  useGetTableData(table)

  return <ChartPie chart={chart} data={data} />
}

export default Pie
