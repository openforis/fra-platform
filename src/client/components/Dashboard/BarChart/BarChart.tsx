import React from 'react'

import { DashboardBarChart } from 'meta/dashboard/dashboard'

import { useIsSomeTableDataFetching } from 'client/store/data'
import Bar from 'client/components/Chart/Bar'
import { useGetTableData } from 'client/components/Dashboard/hooks/useGetTableData'

import { useBarChartData } from './hooks/useBarChartData'

type Props = {
  item: DashboardBarChart
}

const BarChart: React.FC<Props> = (props: Props) => {
  const {
    item: { table, chart },
  } = props

  const data = useBarChartData(table, chart)
  useGetTableData(table)
  const isFetching = useIsSomeTableDataFetching()

  if (isFetching) return null

  return <Bar chart={chart} data={data} />
}

export default BarChart
