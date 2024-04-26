import React from 'react'

import { DashboardPieChart } from 'meta/dashboard/dashboard'

import { useIsSomeTableDataFetching } from 'client/store/data'
import Pie from 'client/components/Chart/Pie'
import { useGetTableData } from 'client/components/Dashboard/hooks/useGetTableData'

import { usePieChartData } from './hooks/usePieChartData'

type Props = {
  item: DashboardPieChart
}

const PieChart: React.FC<Props> = (props: Props) => {
  const {
    item: { table, chart },
  } = props

  const data = usePieChartData(table, chart)
  useGetTableData(table)
  const isFetching = useIsSomeTableDataFetching()

  if (isFetching) return null

  return <Pie data={data} />
}

export default PieChart
