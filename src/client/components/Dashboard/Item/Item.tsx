import React from 'react'

import { DashboardBarChart } from 'meta/dashboard/barChart'
import { DashboardItem, DashboardItemType } from 'meta/dashboard/item'
import { DashboardPieChart } from 'meta/dashboard/pieChart'
import { DashboardTable } from 'meta/dashboard/table'

import { useTableDataStatusListener } from 'client/store/data/tableData/hooks/useTableDataStatusListener'
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
  const { someTableFetching } = useTableDataStatusListener()

  const Component = Components[item.type]

  return (
    <div className="dashboard__item">
      {!hasData && !someTableFetching && <NoData />}
      {hasData && !someTableFetching && <Component item={item} />}
    </div>
  )
}

export default Component
