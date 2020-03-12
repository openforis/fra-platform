import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import ButtonTableExport from '@webapp/components/buttonTableExport'
import Row from '@webapp/app/assessment/components/dataTable/table/row'
import useI18n from '@webapp/components/hooks/useI18n'
import CellOdpHeader from '@webapp/app/assessment/components/dataTable/table/cell/cellOdpHeader'

const Table = props => {
  const { assessmentType, sectionName, sectionAnchor, tableName, odp, rows, data, disabled } = props

  const rowsHeader = rows.filter(row => row.type === 'header')
  const rowsData = rows.filter(row => row.type !== 'header')

  const i18n = useI18n()
  const tableRef = useRef(null)

  return (
    <>
      <ButtonTableExport tableRef={tableRef} filename={sectionAnchor} />

      <table ref={tableRef} className="fra-table data-table">
        <thead>
          {rowsHeader.map(row => (
            <tr key={row.idx}>
              {row.cols.map(col => {
                const { idx, className, colSpan, rowSpan, labelKey, label } = col
                return (
                  <th
                    key={idx}
                    className={className}
                    colSpan={odp && !colSpan ? data.length : colSpan}
                    rowSpan={rowSpan}
                  >
                    {labelKey ? i18n.t(labelKey) : label}
                  </th>
                )
              })}
            </tr>
          ))}
          {odp && (
            <tr>
              {data.map(datum => (
                <CellOdpHeader key={datum.name} sectionName={sectionName} datum={datum} />
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {rowsData.map(row => (
            <Row
              key={row.idx}
              assessmentType={assessmentType}
              sectionName={sectionName}
              tableName={tableName}
              odp={odp}
              data={data}
              row={row}
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
  odp: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  // data
  data: PropTypes.array.isRequired,

  // boolean checks
  disabled: PropTypes.bool.isRequired,
}

export default Table
