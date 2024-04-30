import './Item.scss'
import React from 'react'

import { DashboardItem, DashboardItemType, DashboardTable } from 'meta/dashboard'
import { DashboardBarChart, DashboardPieChart } from 'meta/dashboard/dashboard'

import { useIsSomeTableDataFetching } from 'client/store/data'
import BarChart from 'client/components/Dashboard/BarChart'
import { useHasData } from 'client/components/Dashboard/hooks/useHasData'
import NoData from 'client/components/Dashboard/NoData'
import PieChart from 'client/components/Dashboard/PieChart'
import Table from 'client/components/Dashboard/Table'

const Components: Record<string, React.FC<{ item: DashboardItem<unknown> }>> = {
  [DashboardItemType.table]: Table,
  [DashboardItemType.pieChart]: PieChart,
  [DashboardItemType.barChart]: BarChart,
}

type Props = {
  item: DashboardTable | DashboardPieChart | DashboardBarChart
}

const Component: React.FC<Props> = (props: Props) => {
  const { item } = props
  const { table } = item
  const hasData = useHasData(table)
  const isFetching = useIsSomeTableDataFetching()

  const Component = Components[item.type]

  return (
    <div className="dashboard__item">
      {!hasData && !isFetching && <NoData />}
      {hasData && !isFetching && <Component item={item} />}
    </div>
  )
}

export default Component
