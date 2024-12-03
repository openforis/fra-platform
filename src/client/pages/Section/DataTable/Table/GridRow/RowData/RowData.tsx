import React from 'react'

import { ColType } from 'meta/assessment'

import { DataRow } from 'client/components/DataGrid'

import { Props } from '../props'
import { useRowActions } from './hooks/useRowActions'
import Cell from './Cell'
import CellHeader from './CellHeader'

const RowData: React.FC<Props> = (props) => {
  const { data, assessmentName, lastRow, sectionName, table, row, disabled } = props

  const { cols } = row
  const colHeader = [ColType.placeholder, ColType.header].includes(cols[0].props.colType) ? cols[0] : undefined
  const colsData = colHeader ? cols.slice(1, cols.length) : cols
  const actions = useRowActions({ colHeader, row, sectionName, table })

  return (
    <DataRow actions={actions}>
      {colHeader && <CellHeader assessmentName={assessmentName} col={colHeader} lastRow={lastRow} row={row} />}

      {colsData.map((col, index) => (
        <Cell
          key={col.uuid}
          assessmentName={assessmentName}
          col={col}
          data={data}
          disabled={disabled}
          lastCol={index === cols.length - 1}
          lastRow={lastRow}
          row={row}
          rowIndex={Number(row.props.index)}
          sectionName={sectionName}
          table={table}
        />
      ))}
    </DataRow>
  )
}

export default RowData
