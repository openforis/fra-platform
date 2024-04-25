import React from 'react'

import { DashboardPieChart } from 'meta/dashboard/dashboard'

import Pie from 'client/components/Chart/Pie'
import NoData from 'client/components/Dashboard/NoData'

import { useGetTableData } from '../hooks/useGetTableData'
import { usePieChartData } from '../hooks/usePieChartData'

type Props = {
  item: DashboardPieChart
}

const PieChart: React.FC<Props> = (props: Props) => {
  const {
    item: { table, chart },
  } = props

  const { data, hasData } = usePieChartData(table, chart)
  useGetTableData(table)

  if (!hasData) {
    return <NoData />
  }

  return <Pie data={data} />
}

export default PieChart
