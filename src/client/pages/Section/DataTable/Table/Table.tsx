import './Table.scss'
import React, { useRef } from 'react'

import classNames from 'classnames'
import { Objects } from 'utils/objects'

import { AssessmentName, Table as TableType } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useCanEdit } from 'client/store/user'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import ButtonTableExport from 'client/components/ButtonTableExport'
import { DataGrid } from 'client/components/DataGrid'
import ButtonCopyValues from 'client/pages/Section/DataTable/Table/ButtonCopyValues'
import ButtonTableClear from 'client/pages/Section/DataTable/Table/ButtonTableClear'
import GridHead from 'client/pages/Section/DataTable/Table/GridHead'
import GridRow from 'client/pages/Section/DataTable/Table/GridRow'
import TableBody from 'client/pages/Section/DataTable/Table/TableBody'
import TableHead from 'client/pages/Section/DataTable/Table/TableHead'

import { useTableData } from './hooks/useTableData'
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
  const tableRef = useRef<HTMLTableElement>(null)

  const { headers, parsedTable, rowsData, noticeMessages } = useTableData({ assessmentName, table: tableProps, data })

  const { secondary, name } = parsedTable.props

  const isDataLocked = useIsDataLocked()
  const canClearData = !print && !isDataLocked && !parsedTable.props.readonly

  const fileName = `${sectionAnchor ? `${sectionAnchor} ` : ''}${name}`

  return (
    <div className={classNames('fra-table__container', { 'fra-secondary-table__wrapper': secondary })}>
      <div className="fra-table__scroll-wrapper">
        <div className="fra-table__editor">
          {!print && <ButtonTableExport filename={fileName} tableRef={tableRef} />}
          <ButtonCopyValues table={parsedTable} tableRef={tableRef} />
          {canClearData && <ButtonTableClear disabled={disabled} sectionName={sectionName} table={parsedTable} />}
        </div>

        <DataGrid className="table-grid" gridTemplateColumns={`minmax(auto, 400px) repeat(${headers.length},1fr)`}>
          <GridHead assessmentName={assessmentName} data={data} headers={headers} table={parsedTable} />

          {rowsData.concat(noticeMessages).map((row, index) => (
            <GridRow
              key={row.uuid}
              assessmentName={assessmentName}
              data={data}
              disabled={disabled}
              lastRow={
                index === rowsData.length - 1 || (index === rowsData.length - 1 && !Objects.isEmpty(noticeMessages))
              }
              row={row}
              sectionName={sectionName}
              table={parsedTable}
            />
          ))}
        </DataGrid>
        {/* TODO: remove at the end */}
        <br />
        <table ref={tableRef} className="fra-table data-table" id={parsedTable.props.name}>
          <TableHead assessmentName={assessmentName} data={data} headers={headers} table={parsedTable} />

          <TableBody
            assessmentName={assessmentName}
            data={data}
            disabled={disabled}
            sectionName={sectionName}
            table={parsedTable}
          />
        </table>
        {!print && canEdit && <DataValidations table={parsedTable} />}
      </div>
    </div>
  )
}

Table.defaultProps = {
  sectionAnchor: '',
}

export default Table
