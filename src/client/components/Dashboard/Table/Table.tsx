import React from 'react'

import { DashboardTable } from 'meta/dashboard'

import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import TableComponent from 'client/pages/Section/DataTable/Table'

import { useData } from '../hooks/useData'
import { useGetTableData } from '../hooks/useGetTableData'

type Props = {
  item: DashboardTable
}

const Table: React.FC<Props> = (props: Props) => {
  const { assessmentName, sectionName } = useSectionRouteParams()
  const {
    item: { table },
  } = props

  const data = useData(table)
  const disabled = true

  useGetTableData(table)

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
