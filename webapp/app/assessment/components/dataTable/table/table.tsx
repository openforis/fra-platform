import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import { TableSpec } from '@webapp/app/assessment/components/section/sectionSpec'

import { useI18n, usePrintView } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import Row from './row'
import CellOdpHeader from './cellOdpHeader'

const Table = (props) => {
  const { assessmentType, sectionName, sectionAnchor, tableSpec, rows, data, disabled } = props

  const odp = TableSpec.isOdp(tableSpec)
  const secondary = TableSpec.isSecondary(tableSpec)

  const rowsHeader = rows.filter((row) => row.type === 'header')
  const rowsData = rows.filter((row) => row.type !== 'header')

  const i18n = useI18n()
  const [printView] = usePrintView()
  const tableRef = useRef(null)
  const displayTableExportButton = !secondary && !printView && tableRef.current != null

  return (
    <div className={`fra-table__container${secondary ? ' fra-secondary-table__wrapper' : ''}`}>
      <div className="fra-table__scroll-wrapper">
        {displayTableExportButton && <ButtonTableExport tableRef={tableRef} filename={sectionAnchor} />}

        <table id={TableSpec.getName(tableSpec)} ref={tableRef} className="fra-table data-table">
          <thead>
            {rowsHeader.map((row) => (
              <tr key={row.idx}>
                {row.cols.map((col) => {
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
                {data.map((datum) => (
                  <CellOdpHeader key={datum.name || datum.year} sectionName={sectionName} datum={datum} />
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {rowsData.map((row) => (
              <Row
                key={row.idx}
                assessmentType={assessmentType}
                sectionName={sectionName}
                tableSpec={tableSpec}
                data={data}
                row={row}
                disabled={disabled}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Table.propTypes = {
  assessmentType: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  sectionAnchor: PropTypes.string.isRequired,
  tableSpec: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  disabled: PropTypes.bool.isRequired,
}

export default Table
