import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols } from 'meta/assessment/cols'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { DataCell } from 'client/components/DataGrid'
import OdpHeaderCell from 'client/pages/Section/DataTable/Table/GridHeadCell/OdpHeaderCell'

import { SortOrder } from '../hooks/useTableSorting'
import { useGridHeadCellProps } from './hooks/useGridHeadCellProps'
import { GridHeadCellProps } from './types'

const GridHeadCell: React.FC<GridHeadCellProps> = (props) => {
  const { col, firstCol, onSort, sortState, table } = props

  const { t } = useTranslation()
  const cycle = useCycle()
  const { className, gridColumn, gridRow, lastCol, odpYear } = useGridHeadCellProps(props)

  const sortColName = col.props.sortable?.[cycle.uuid]

  const { colName } = col.props
  const isCurrentlySorted = sortState?.colName === colName
  const sortOrder = isCurrentlySorted ? sortState.order : SortOrder.NONE

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

  const handleClick = () => {
    if (sortColName) onSort?.(sortColName)
  }

  // TODO: Separate component
  const getSortButton = () => {
    if (!sortColName) return null

    let icon = '↕'

    if (sortOrder === SortOrder.ASC) icon = '▲'
    if (sortOrder === SortOrder.DESC) icon = '▼'

    return (
      <button
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleClick()
        }}
        style={{ cursor: 'pointer', marginLeft: '4px', userSelect: 'none', padding: '2px' }}
        title="Click to sort"
        type="button"
      >
        {icon}
      </button>
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
      {getSortButton()}
    </DataCell>
  )
}

export default GridHeadCell
