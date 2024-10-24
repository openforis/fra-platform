import React from 'react'

import { Row as TypeRow, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import Row from 'client/pages/Section/DataTable/Table/Row'

type Props = {
  disabled: boolean
  table: Table
  sectionName: string
  assessmentName: string
  data: RecordAssessmentData
}

const TableBody: React.FC<Props> = (props) => {
  const { disabled, table, assessmentName, sectionName, data } = props
  const rowsData = table.rows.filter((row) => !row.props.hidden && row.props.type !== RowType.header)

  return (
    <tbody>
      {rowsData.map((row: TypeRow) => {
        return (
          <Row
            key={row.uuid}
            assessmentName={assessmentName}
            data={data}
            disabled={disabled}
            row={row}
            sectionName={sectionName}
            table={table}
          />
        )
      })}
    </tbody>
  )
}

export default TableBody
