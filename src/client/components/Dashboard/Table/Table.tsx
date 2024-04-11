import React from 'react'

import { DashboardTable } from 'meta/dashboard'

import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import TableComponent from 'client/pages/Section/DataTable/Table'

type Props = {
  item: DashboardTable
}
const Table: React.FC<Props> = (props: Props) => {
  const { assessmentName, sectionName } = useSectionRouteParams()
  const {
    item: { table },
  } = props

  const data = {}
  const disabled = true

  return (
    <TableComponent
      assessmentName={assessmentName}
      data={data}
      disabled={disabled}
      sectionName={sectionName}
      table={table}
    />
  )
}

export default Table
