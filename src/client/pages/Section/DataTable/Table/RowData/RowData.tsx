import React from 'react'

import { Objects } from 'utils/objects'

import { ColType } from 'meta/assessment/col'
import { Cols } from 'meta/assessment/cols'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { DataRow } from 'client/components/DataGrid'
import { RowProps } from 'client/pages/Section/DataTable/Table/types'

import { useHighlightRange } from './hooks/useHighlightRange'
import { useRowActions } from './hooks/useRowActions'
import Cell from './Cell'
import CellHeader from './CellHeader'

const RowData: React.FC<RowProps> = (props) => {
  const { assessmentName, data, disabled, lastRow, row, rowCount, rowIndex, sectionName, table } = props

  const { cols } = row
  const colHeader = [ColType.placeholder, ColType.header].includes(cols[0].props.colType) ? cols[0] : undefined
  const actions = useRowActions({ colHeader, row, sectionName, table })
  const highlightRange = useHighlightRange({ cols })
  const cycle = useCycle()

  return (
    <DataRow actions={actions} highlightRange={highlightRange}>
      {cols.map((col, colIndex) => {
        const lastCol = colIndex === cols.length - 1

        const { rowSpan = 1 } = Cols.getStyle({ col, cycle })
        const lastSpanningRow = rowSpan !== 1 && rowSpan + rowIndex === rowCount

        if (!Objects.isEmpty(colHeader) && colIndex === 0) {
          return (
            <CellHeader
              key={col.uuid}
              assessmentName={assessmentName}
              col={colHeader}
              lastCol={lastCol}
              lastRow={lastRow || lastSpanningRow}
              row={row}
            />
          )
        }

        return (
          <Cell
            key={col.uuid}
            assessmentName={assessmentName}
            col={col}
            data={data}
            disabled={disabled}
            lastCol={lastCol}
            lastRow={lastRow || lastSpanningRow}
            row={row}
            rowIndex={Number(row.props.index)}
            sectionName={sectionName}
            table={table}
          />
        )
      })}
    </DataRow>
  )
}

export default RowData
