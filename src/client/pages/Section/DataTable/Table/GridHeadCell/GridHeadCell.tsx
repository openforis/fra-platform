import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols } from 'meta/assessment/cols'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { DataCell } from 'client/components/DataGrid'
import ButtonSort from 'client/pages/Section/DataTable/Table/GridHeadCell/ButtonSort'
import OdpHeaderCell from 'client/pages/Section/DataTable/Table/GridHeadCell/OdpHeaderCell'

import { useGridHeadCellProps } from './hooks/useGridHeadCellProps'
import { GridHeadCellProps } from './types'

const GridHeadCell: React.FC<GridHeadCellProps> = (props) => {
  const { col, firstCol, onSort, sortState, table } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const { className, gridColumn, gridRow, lastCol, odpYear } = useGridHeadCellProps(props)

  if (odpYear) {
    return (
      <OdpHeaderCell
        key={col.uuid}
        className={className}
        gridColumn={gridColumn}
        gridRow={gridRow}
        lastCol={lastCol}
        odpYear={odpYear}
        sectionName={table.props.name}
        table={table}
      />
    )
  }

  return (
    <DataCell
      key={col.uuid}
      className={className}
      firstCol={firstCol}
      gridColumn={gridColumn}
      gridRow={gridRow}
      header
      lastCol={lastCol}
    >
      {Cols.getLabel({ cycle, col, t })}
      <ButtonSort col={col} onSort={onSort} sortState={sortState} />
    </DataCell>
  )
}

export default GridHeadCell
