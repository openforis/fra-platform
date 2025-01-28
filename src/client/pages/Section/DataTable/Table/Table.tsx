import './Table.scss'
import React, { useRef } from 'react'

import classNames from 'classnames'

import { AssessmentName, Table as TableType } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useCanEdit } from 'client/store/user'
import { useCanViewReview } from 'client/store/user/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import { ButtonGridExport, DataGrid } from 'client/components/DataGrid'
import ButtonCopyValues from 'client/pages/Section/DataTable/Table/ButtonCopyValues'
import ButtonTableClear from 'client/pages/Section/DataTable/Table/ButtonTableClear'
import GridHeadCell from 'client/pages/Section/DataTable/Table/GridHeadCell'
import RowData from 'client/pages/Section/DataTable/Table/RowData'
import RowNoticeMessage from 'client/pages/Section/DataTable/Table/RowNoticeMessage'

import { useCellBorderCorrection } from './hooks/useCellBorderCorrection'
import { useGridTemplateColumns } from './hooks/useGridTemplateColumns'
import { useParsedTable } from './hooks/useParsedTable'
import DataValidations from './DataValidations'

type Props = {
  assessmentName: AssessmentName
  sectionName: string
  sectionAnchor?: string
  table: TableType
  data: RecordAssessmentData
  disabled: boolean
}

const Table: React.FC<Props> = (props) => {
  const { assessmentName, sectionName, sectionAnchor, table: tableProps, data, disabled } = props

  const canEdit = useCanEdit(sectionName)

  const { print } = useIsPrintRoute()

  const gridRef = useRef<HTMLDivElement>(null)

  const { firstHeaderRowSpan, headers, noticeMessages, rowsData, rowsHeader, table, withReview } = useParsedTable({
    assessmentName,
    data,
    table: tableProps,
  })

  const gridTemplateColumns = useGridTemplateColumns({ headers, table })
  useCellBorderCorrection({ disabled, gridRef, rowsData, rowsHeader })

  const canViewReview = useCanViewReview(sectionName)
  const withActions = withReview && canViewReview

  const { secondary, name } = table.props

  const isDataLocked = useIsDataLocked()
  const canClearData = !print && !isDataLocked && !table.props.readonly

  const fileName = `${sectionAnchor ? `${sectionAnchor} ` : ''}${name}`

  return (
    <div className={classNames('table-grid-container', { 'secondary-table': secondary })}>
      <div className="table-grid-actions">
        {!print && <ButtonGridExport filename={fileName} gridRef={gridRef} />}
        <ButtonCopyValues gridRef={gridRef} table={table} />
        {canClearData && <ButtonTableClear disabled={disabled} sectionName={sectionName} table={table} />}
      </div>

      <DataGrid
        ref={gridRef}
        className="table-grid"
        gridTemplateColumns={gridTemplateColumns}
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
                  data={data}
                  firstCol={firstCol}
                  headers={headers}
                  row={row}
                  rowIndex={rowIndex}
                  table={table}
                />
              )
            })}
            {withActions && <div />}
          </React.Fragment>
        ))}

        {rowsData.map((row, index) => (
          <RowData
            key={row.uuid}
            assessmentName={assessmentName}
            data={data}
            disabled={disabled}
            lastRow={index === rowsData.length - 1}
            row={row}
            rowCount={rowsHeader.length + rowsData.length}
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

Table.defaultProps = {
  sectionAnchor: '',
}

export default Table
