import React from 'react'

import { DashboardTable } from 'meta/dashboard/dashboard'

type Props = {
  item: DashboardTable
}
const Table: React.FC<Props> = (props: Props) => {
  const {
    item: { table },
  } = props

  return (
    <>
      <div>Table placeholder</div>
      <pre>{JSON.stringify(table, null, 2)}</pre>
    </>
  )
}

export default Table
