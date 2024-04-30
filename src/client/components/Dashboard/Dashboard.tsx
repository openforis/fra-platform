import './Dashboard.scss'
import React from 'react'

import Item from 'client/components/Dashboard/Item'
import { Props } from 'client/components/Dashboard/props'
import Title from 'client/components/Dashboard/Title'

import { useGetTableData } from './hooks/useGetTableData'

const Dashboard: React.FC<Props> = (props: Props) => {
  const { items } = props
  useGetTableData(props)

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
