import './Table.scss'
import React, { useRef } from 'react'

import classNames from 'classnames'

import { AssessmentName, RowType, Table as TableType } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection/hooks'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useCanEdit } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import ButtonTableExport from 'client/components/ButtonTableExport'
import { DataGrid } from 'client/components/DataGrid'
import ButtonCopyValues from 'client/pages/Section/DataTable/Table/ButtonCopyValues'
import ButtonTableClear from 'client/pages/Section/DataTable/Table/ButtonTableClear'
import GridRow from 'client/pages/Section/DataTable/Table/GridRow'
import TableBody from 'client/pages/Section/DataTable/Table/TableBody'
import TableHead from 'client/pages/Section/DataTable/Table/TableHead'

import { parseTable } from './utils/parseTable'
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

  const cycle = useCycle()
  const showODP = useShowOriginalDatapoints()
  const countryIso = useCountryIso()

  const { print } = useIsPrintRoute()
  const tableRef = useRef<HTMLTableElement>(null)

  const { headers, table } = parseTable({ assessmentName, cycle, countryIso, data, showODP, table: tableProps })
  const { secondary, name } = table.props

  const isDataLocked = useIsDataLocked()
  const canClearData = !print && !isDataLocked && !table.props.readonly

  const fileName = `${sectionAnchor ? `${sectionAnchor} ` : ''}${name}`

  const rowsData = table.rows.filter((row) => !row.props.hidden && row.props.type !== RowType.header)

  return (
    <div className={classNames('fra-table__container', { 'fra-secondary-table__wrapper': secondary })}>
      <div className="fra-table__scroll-wrapper">
        <div className="fra-table__editor">
          {!print && <ButtonTableExport filename={fileName} tableRef={tableRef} />}
          <ButtonCopyValues table={table} tableRef={tableRef} />
          {canClearData && <ButtonTableClear disabled={disabled} sectionName={sectionName} table={table} />}
        </div>

        <DataGrid className="table__grid" gridTemplateColumns={`minmax(auto, 400px) repeat(${headers.length},1fr)`}>
          {rowsData.map((row, index) => (
            <GridRow
              key={row.uuid}
              assessmentName={assessmentName}
              data={data}
              disabled={disabled}
              lastRow={index === rowsData.length - 1}
              row={row}
              sectionName={sectionName}
              table={table}
            />
          ))}
        </DataGrid>

        {/* TODO: remove at the end */}
        <table ref={tableRef} className="fra-table data-table" id={table.props.name}>
          <TableHead assessmentName={assessmentName} data={data} headers={headers} table={table} />

          <TableBody
            assessmentName={assessmentName}
            data={data}
            disabled={disabled}
            sectionName={sectionName}
            table={table}
          />
        </table>
        {!print && canEdit && <DataValidations table={table} />}
      </div>
    </div>
  )
}

Table.defaultProps = {
  sectionAnchor: '',
}

export default Table
