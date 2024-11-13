/* eslint-disable react/no-unused-prop-types */

import React from 'react'
import { useTranslation } from 'react-i18next'

import { Col, Cols, Row, Table } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { DataCell } from 'client/components/DataGrid'
import OdpHeaderCell from 'client/pages/Section/DataTable/Table/GridHead/OdpHeaderCell'

import { useGridHeadCellProps } from './hooks/useGridHeadCellProps'

type Props = {
  assessmentName: string
  col: Col
  colIndex: number
  data: RecordAssessmentData
  headers: Array<string>
  row: Row
  rowIndex: number
  table: Table
}

const GridHeadCell: React.FC<Props> = (props) => {
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
