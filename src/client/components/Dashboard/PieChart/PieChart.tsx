import React from 'react'

import { DashboardPieChart } from 'meta/dashboard/dashboard'

import Pie from 'client/components/Chart/Pie'

import { useGetTableData } from '../hooks/useGetTableData'
import { usePieChartData } from '../hooks/usePieChartData'

type Props = {
  item: DashboardPieChart
}

const PieChart: React.FC<Props> = (props: Props) => {
  const {
    item: { table, chart },
  } = props

  const data = usePieChartData(table, chart)
  useGetTableData(table)

  return <Pie chart={chart} data={data} />
}

export default PieChart
