import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import ButtonTableExport from '@webapp/components/buttonTableExport'
import Row from '@webapp/app/assessment/components/dataTable/table/row'
import useI18n from '@webapp/components/hooks/useI18n'

const Table = props => {
  const { assessmentType, sectionName, sectionAnchor, tableName, rows, data, disabled } = props

  const rowsHeader = rows.filter(row => row.type === 'header')
  const rowsData = rows.filter(row => row.type !== 'header')

  const i18n = useI18n()
  const tableRef = useRef(null)

  return (
    <>
      <ButtonTableExport tableRef={tableRef} filename={sectionAnchor} />

      <table ref={tableRef} className="fra-table">
        <thead>
          {rowsHeader.map(row => (
            <tr key={row.idx}>
              {row.cols.map(col => (
                <th key={col.idx} className={col.className} colSpan={col.colSpan} rowSpan={col.rowSpan}>
                  {col.labelKey ? i18n.t(col.labelKey) : col.label}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rowsData.map(row => (
            <Row
              key={row.idx}
              assessmentType={assessmentType}
              sectionName={sectionName}
              tableName={tableName}
              data={data}
              row={row}
              rowIdx={row.idx}
              disabled={disabled}
              pasteUpdate={() => {}}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

Table.propTypes = {
  // metadata
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  // data
  data: PropTypes.array.isRequired,

  // boolean checks
  disabled: PropTypes.bool.isRequired,
}

export default Table
