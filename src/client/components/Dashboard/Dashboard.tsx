import './Dashboard.scss'
import React from 'react'

import { DashboardTable } from 'meta/dashboard'
import { DashboardBarChart, DashboardPieChart } from 'meta/dashboard/dashboard'

import Item from 'client/components/Dashboard/Item'
import Title from 'client/components/Dashboard/Title/Title'

type Props = {
  items: Array<DashboardTable | DashboardPieChart | DashboardBarChart>
}

const Dashboard: React.FC<Props> = (props: Props) => {
  const { items } = props

  return (
    <div className="dashboard">
      {items.map((item) => {
        return (
          <div key={item.title.key} className="dashboard-item">
            <Title item={item} />
            <Item item={item} />
          </div>
        )
      })}
    </div>
  )
}

export default Dashboard
