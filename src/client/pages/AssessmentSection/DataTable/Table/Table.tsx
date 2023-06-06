import React, { useRef } from 'react'

import classNames from 'classnames'

import { AssessmentName, Table as TableType } from 'meta/assessment'
import { RecordAssessmentData } from 'meta/data'

import { useCycle } from 'client/store/assessment'
import { useShowOriginalDatapoints } from 'client/store/ui/assessmentSection/hooks'
import { useIsDataLocked } from 'client/store/ui/dataLock'
import { useCountryIso } from 'client/hooks'
import { useIsPrint } from 'client/hooks/useIsPath'
import ButtonTableClear from 'client/components/ButtonTableClear'
import ButtonTableExport from 'client/components/ButtonTableExport'
import ButtonCopyValues from 'client/pages/AssessmentSection/DataTable/Table/ButtonCopyValues'
import TableBody from 'client/pages/AssessmentSection/DataTable/Table/TableBody'
import TableHead from 'client/pages/AssessmentSection/DataTable/Table/TableHead'

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

  const cycle = useCycle()
  const showODP = useShowOriginalDatapoints()

  const countryIso = useCountryIso()

  const { print } = useIsPrint()
  const tableRef = useRef<HTMLTableElement>(null)

  const { headers, table } = parseTable({ assessmentName, cycle, countryIso, data, showODP, table: tableProps })
  const { secondary, name } = table.props

  const isDataLocked = useIsDataLocked()
  const showClearButton = !print && !isDataLocked && !table.props.readonly

  return (
    <div className={classNames('fra-table__container', { 'fra-secondary-table__wrapper': secondary })}>
      <div className="fra-table__scroll-wrapper">
        {!print && <ButtonTableExport tableRef={tableRef} filename={`${sectionAnchor} ${name}`} />}

        {showClearButton && (
          <ButtonTableClear table={table} disabled={disabled} assessmentName={assessmentName} sectionName={sectionName} />
        )}

        <ButtonCopyValues tableRef={tableRef} table={table} />

        <table id={table.props.name} ref={tableRef} className="fra-table data-table">
          <TableHead data={data} headers={headers} table={table} assessmentName={assessmentName} />

          <TableBody data={data} sectionName={sectionName} table={table} assessmentName={assessmentName} disabled={disabled} />
        </table>

        {!print && <DataValidations table={table} />}
      </div>
    </div>
  )
}

export default Table
