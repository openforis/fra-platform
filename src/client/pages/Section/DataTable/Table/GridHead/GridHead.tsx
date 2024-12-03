import React from 'react'

import { Col as TypeCol, Row as TypeRow, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import GridHeadCell from 'client/pages/Section/DataTable/Table/GridHead/GridHeadCell'

type Props = {
  assessmentName: string
  data: RecordAssessmentData
  headers: Array<string>
  table: Table
  withActions: boolean
}

const GridHead: React.FC<Props> = (props) => {
  const { assessmentName, data, headers, table, withActions } = props

  const rowsHeader = table.rows.filter((row) => row.props.type === RowType.header)
  return (
    <>
      {rowsHeader.map((row: TypeRow, rowIndex: number) => (
        <React.Fragment key={row.uuid}>
          {row.cols.map((col: TypeCol, colIndex: number) => (
            <GridHeadCell
              key={col.uuid}
              assessmentName={assessmentName}
              col={col}
              colIndex={colIndex}
              data={data}
              headers={headers}
              row={row}
              rowIndex={rowIndex}
              table={table}
            />
          ))}
          {withActions && <div />}
        </React.Fragment>
      ))}
    </>
  )
}

export default GridHead
