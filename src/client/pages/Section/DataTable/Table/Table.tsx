import './Table.scss'
import React, { useRef } from 'react'

import classNames from 'classnames'

import { AssessmentName, Table as TableType } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection/hooks'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useCanEdit } from 'client/store/user'
import { useCountryIso } from 'client/hooks'
import { useIsPrintRoute } from 'client/hooks/useIsRoute'
import ButtonTableExport from 'client/components/ButtonTableExport'
import ButtonCopyValues from 'client/pages/Section/DataTable/Table/ButtonCopyValues'
import ButtonTableClear from 'client/pages/Section/DataTable/Table/ButtonTableClear'
import TableBody from 'client/pages/Section/DataTable/Table/TableBody'
import TableHead from 'client/pages/Section/DataTable/Table/TableHead'

import { parseTable } from './utils/parseTable'
import DataValidations from './DataValidations'

type Props = {
  assessmentName: AssessmentName
  sectionName: string
  sectionAnchor: string
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

  return (
    <div className={classNames('fra-table__container', { 'fra-secondary-table__wrapper': secondary })}>
      <div className="fra-table__scroll-wrapper">
        <div className="fra-table__editor">
          {!print && <ButtonTableExport tableRef={tableRef} filename={`${sectionAnchor} ${name}`} />}
          <ButtonCopyValues tableRef={tableRef} table={table} />
          {canClearData && <ButtonTableClear table={table} disabled={disabled} sectionName={sectionName} />}
        </div>

        <table id={table.props.name} ref={tableRef} className="fra-table data-table">
          <TableHead data={data} headers={headers} table={table} assessmentName={assessmentName} />

          <TableBody
            data={data}
            sectionName={sectionName}
            table={table}
            assessmentName={assessmentName}
            disabled={disabled}
          />
        </table>

        {!print && canEdit && <DataValidations table={table} />}
      </div>
    </div>
  )
}

export default Table
