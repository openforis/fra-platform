import React from 'react'
import { useTranslation } from 'react-i18next'

import { Cols } from 'meta/assessment'

import { useCycle } from 'client/store/assessment'
import { DataCell } from 'client/components/DataGrid'
import OdpHeaderCell from 'client/pages/Section/DataTable/Table/GridHeadCell/OdpHeaderCell'

import { useGridHeadCellProps } from './hooks/useGridHeadCellProps'
import { GridHeadCellProps } from './types'

const GridHeadCell: React.FC<GridHeadCellProps> = (props) => {
  const { col, table } = props

  const cycle = useCycle()
  const { className, gridColumn, gridRow, lastCol, odpHeader } = useGridHeadCellProps(props)

  const { t } = useTranslation()

  if (odpHeader) {
    return (
      <OdpHeaderCell
        key={col.uuid}
        className={className}
        gridColumn={gridColumn}
        gridRow={gridRow}
        lastCol={lastCol}
        odpId={odpHeader.id}
        odpYear={odpHeader.year}
        sectionName={table.props.name}
      />
    )
  }

  return (
    <DataCell key={col.uuid} className={className} gridColumn={gridColumn} gridRow={gridRow} header lastCol={lastCol}>
      {Cols.getLabel({ cycle, col, t })}
    </DataCell>
  )
}

export default GridHeadCell
