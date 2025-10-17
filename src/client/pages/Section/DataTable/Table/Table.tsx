import './Table.scss'
import React, { useRef } from 'react'

import classNames from 'classnames'

import { AssessmentName } from 'meta/assessment/assessment'
import { Table as TableType } from 'meta/assessment/table'
import { RecordAssessmentData } from 'meta/data'

import { useIsDataLocked } from 'client/store/ui/countryReport/hooks/datalock'
import { useCanEdit, useCanViewReview } from 'client/store/user/hooks/auth'
import { useIsPrintRoute } from 'client/hooks/routes'
import { ButtonGridExport, DataGrid } from 'client/components/DataGrid'
import ButtonCopyValues from 'client/pages/Section/DataTable/Table/ButtonCopyValues'
import ButtonTableClear from 'client/pages/Section/DataTable/Table/ButtonTableClear'
import GridHeadCell from 'client/pages/Section/DataTable/Table/GridHeadCell'
import RowData from 'client/pages/Section/DataTable/Table/RowData'
import RowNoticeMessage from 'client/pages/Section/DataTable/Table/RowNoticeMessage'

import { useCellBorderCorrection } from './hooks/useCellBorderCorrection'
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'
import { useParsedTable } from './hooks/useParsedTable'
import { useTableSorting } from './hooks/useTableSorting'
import DataValidations from './DataValidations'

type Props = {
  assessmentName: AssessmentName
  data: RecordAssessmentData
  disabled: boolean
  hideReview?: boolean
  sectionAnchor?: string
  sectionName: string
  table: TableType
}

const Table: React.FC<Props> = (props) => {
  const { assessmentName, data, disabled, hideReview, sectionAnchor = '', sectionName, table: _table } = props

  const isDataLocked = useIsDataLocked()
  const canEdit = useCanEdit(sectionName)
  const canViewReview = useCanViewReview(sectionName)
  const { print } = useIsPrintRoute()

  const parsedTable = useParsedTable({ assessmentName, table: _table })
  const { firstHeaderRowSpan, headers, noticeMessages, rowsData, rowsHeader, table, withReview } = parsedTable

  const { handleSort, sortState, sortedRowsData } = useTableSorting({ rowsData, data, table })

  const gridTemplateColumns = useGridTemplateColumns({ headers, table })
  const gridRef = useRef<HTMLDivElement>(null)
  useCellBorderCorrection({ disabled, gridRef, rowsData: sortedRowsData, rowsHeader })

  const withActions = withReview && canViewReview && !hideReview
  const { name, secondary } = table.props
  const canClearData = !print && !isDataLocked && !table.props.readonly

  const tableId = `tableId_${table.id}_tableName_${table.props.name}`

  return (
    <div className={classNames('table-grid-container', { 'secondary-table': secondary })}>
      <div className="table-grid-actions">
        {!print && (
          <ButtonGridExport filename={`${sectionAnchor ? `${sectionAnchor} ` : ''}${name}`} gridRef={gridRef} />
        )}
        <ButtonCopyValues gridRef={gridRef} table={table} />
        {canClearData && <ButtonTableClear disabled={disabled} sectionName={sectionName} table={table} />}
      </div>
      <DataGrid
        ref={gridRef}
        className="table-grid"
        gridTemplateColumns={gridTemplateColumns}
        id={tableId}
        withActions={withActions}
      >
        {rowsHeader.map((row, rowIndex) => (
          <React.Fragment key={row.uuid}>
            {row.cols.map((col, colIndex) => {
              const firstCol = colIndex === 0 && (rowIndex === 0 || rowIndex >= firstHeaderRowSpan)

              return (
                <GridHeadCell
                  key={col.uuid}
                  assessmentName={assessmentName}
                  col={col}
                  colIndex={colIndex}
                  firstCol={firstCol}
                  headers={headers}
                  onSort={handleSort}
                  row={row}
                  rowIndex={rowIndex}
                  sortState={sortState}
                  table={table}
                />
              )
            })}
            {withActions && <div />}
          </React.Fragment>
        ))}

        {sortedRowsData.map((row, index) => (
          <RowData
            key={row.uuid}
            assessmentName={assessmentName}
            data={data}
            disabled={disabled}
            hideReview={hideReview}
            lastRow={index === sortedRowsData.length - 1}
            row={row}
            rowCount={rowsHeader.length + sortedRowsData.length}
            rowIndex={rowsHeader.length + index}
            sectionName={sectionName}
            table={table}
          />
        ))}

        {noticeMessages.map((row) => (
          <RowNoticeMessage
            key={row.uuid}
            assessmentName={assessmentName}
            data={data}
            disabled={disabled}
            row={row}
            sectionName={sectionName}
            table={table}
          />
        ))}
      </DataGrid>
      {!print && canEdit && <DataValidations table={table} />}
    </div>
  )
}

export default Table
