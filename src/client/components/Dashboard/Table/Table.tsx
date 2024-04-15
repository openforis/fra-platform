import React from 'react'

import { DashboardTable } from 'meta/dashboard'

import { useSectionRouteParams } from 'client/hooks/useRouteParams'
import { useData } from 'client/components/Dashboard/Table/hooks/useData'
import { useGetTableData } from 'client/components/Dashboard/Table/hooks/useGetTableData'
import TableComponent from 'client/pages/Section/DataTable/Table'

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
