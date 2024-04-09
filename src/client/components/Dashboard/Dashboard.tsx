import React from 'react'

import { DashboardItem, DashboardItemType } from 'meta/dashboard'

import Table from 'client/components/Dashboard/Table'
import Title from 'client/components/Dashboard/Title/Title'

type Props = {
  items: Array<DashboardItem>
}

const Components: Record<string, React.FC<{ item: DashboardItem<unknown> }>> = {
  [DashboardItemType.table]: Table,
}

const Dashboard: React.FC<Props> = (props: Props) => {
  const { items } = props
  return (
    <>
      {items.map((item) => {
        const Component = Components[item.type]
        return (
          <React.Fragment key={item.title.key}>
            <Title item={item} />
            <Component item={item} />
          </React.Fragment>
        )
      })}
    </>
  )
}

export default Dashboard
