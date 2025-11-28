import React from 'react'

import { DashboardItem, DashboardItemType } from 'meta/dashboard/item'

import { useTableDataStatusListener } from 'client/store/data/tableData/hooks/useTableDataStatusListener'
import BarChart from 'client/components/Dashboard/BarChart'
import { useHasData } from 'client/components/Dashboard/hooks/useHasData'
import NoData from 'client/components/Dashboard/NoData'
import PieChart from 'client/components/Dashboard/PieChart'
import Table from 'client/components/Dashboard/Table'

const Components: Record<string, React.FC<{ item: DashboardItem }>> = {
  [DashboardItemType.table]: Table,
  [DashboardItemType.pieChart]: PieChart,
  [DashboardItemType.barChart]: BarChart,
}

type Props = {
  item: DashboardItem
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
