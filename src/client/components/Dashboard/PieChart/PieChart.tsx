import React from 'react'

import { DashboardPieChart } from 'meta/dashboard/dashboard'

import Pie from 'client/components/Chart/Pie'

import { useChartData } from '../hooks/useChartData'
import { useGetTableData } from '../hooks/useGetTableData'

type Props = {
  item: DashboardPieChart
}

const PieChart: React.FC<Props> = (props: Props) => {
  const {
    item: { table, chart },
  } = props

  const data = useChartData(table, chart)
  useGetTableData(table)

  return <Pie chart={chart} data={data} />
}

export default PieChart
