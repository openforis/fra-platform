import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import ButtonTableExport from '@webapp/components/buttonTableExport'
import Row from '@webapp/app/assessment/components/dataTable/table/row'
import CellOdpHeader from '@webapp/app/assessment/components/dataTable/table/cell/cellOdpHeader'
import useI18n from '@webapp/components/hooks/useI18n'

const Table = props => {
  const {
    assessmentType,
    sectionName,
    sectionAnchor,
    tableName,
    odp,
    rows,
    data,
    disabled,
    updateTableDataCell,
    secondary,
  } = props

  const rowsHeader = rows.filter(row => row.type === 'header')
  const rowsData = rows.filter(row => row.type !== 'header')

  const i18n = useI18n()
  const tableRef = useRef(null)

  return (
    <>
      {!secondary && <ButtonTableExport tableRef={tableRef} filename={sectionAnchor} />}

      <table ref={tableRef} className="fra-table data-table">
        <thead>
          {rowsHeader.map(row => (
            <tr key={row.idx}>
              {row.cols.map(col => {
                const { idx, className, colSpan, rowSpan, labelKey, labelParams, label } = col
                return (
                  <th
                    key={idx}
                    className={className}
                    colSpan={odp && !colSpan ? data.length : colSpan}
                    rowSpan={rowSpan}
                  >
                    {labelKey ? i18n.t(labelKey, labelParams) : label}
                  </th>
                )
              })}
            </tr>
          ))}
          {odp && (
            <tr>
              {data.map(datum => (
                <CellOdpHeader key={datum.name || datum.year} sectionName={sectionName} datum={datum} />
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
              updateTableDataCell={updateTableDataCell}
              secondary={secondary}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}

Table.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
  tableName: PropTypes.string.isRequired,
  odp: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
  updateTableDataCell: PropTypes.func.isRequired,
  secondary: PropTypes.bool.isRequired,
}

export default Table
