import './Dashboard.scss'
import React from 'react'

import { DashboardItem, DashboardItemType } from 'meta/dashboard'

import PieChart from 'client/components/Dashboard/PieChart'
import Table from 'client/components/Dashboard/Table'
import Title from 'client/components/Dashboard/Title/Title'

type Props = {
  items: Array<DashboardItem>
}

const Components: Record<string, React.FC<{ item: DashboardItem<unknown> }>> = {
  [DashboardItemType.table]: Table,
  [DashboardItemType.pieChart]: PieChart,
}

const Dashboard: React.FC<Props> = (props: Props) => {
  const { items } = props
  return (
    <div className="dashboard">
      {items.map((item) => {
        const Component = Components[item.type]
        return (
          <div key={item.title.key} className="dashboard-item">
            <Title item={item} />
            <Component item={item} />
          </div>
        )
      })}
    </div>
  )
}

export default Dashboard
