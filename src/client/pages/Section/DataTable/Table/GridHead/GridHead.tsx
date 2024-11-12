import React from 'react'

import { Col as TypeCol, Row as TypeRow, RowType, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useRenderCell } from './hooks/useRenderCell'

type Props = {
  assessmentName: string
  data: RecordAssessmentData
  headers: Array<string>
  table: Table
}

const GridHead: React.FC<Props> = (props) => {
  const { assessmentName, data, headers, table } = props

  const renderCell = useRenderCell({ assessmentName, data, headers, table })
  const rowsHeader = table.rows.filter((row) => row.props.type === RowType.header)

  return (
    <>
      {rowsHeader.map((row: TypeRow, rowIndex: number) =>
        row.cols.map((col: TypeCol, colIndex: number) => {
          return renderCell({ col, colIndex, row, rowIndex })
        })
      )}
    </>
  )
}

export default GridHead
