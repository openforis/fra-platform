import React from 'react'

import { DashboardPieChart } from 'meta/dashboard/dashboard'

import ChartPie from 'client/components/Chart/ChartPie'
import { useData } from 'client/components/Dashboard/hooks/useData'
import { useGetTableData } from 'client/components/Dashboard/hooks/useGetTableData'

type Props = {
  item: DashboardPieChart
}

const PieChart: React.FC<Props> = (props: Props) => {
  const {
    item: { table, chart },
  } = props

  const data = useData(table)
  useGetTableData(table)

  return <ChartPie chart={chart} data={data} />
}

export default PieChart
