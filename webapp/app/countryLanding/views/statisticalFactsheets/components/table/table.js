import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'

import useStatisticalFactsheetsState from '../../hooks/useStatisticalFactsheetsState'

const Table = (props) => {
  const i18n = useI18n()
  const { columns, rows, section, levelIso } = props
  const tableRef = useRef(null)

  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)

  if (!loaded) {
    return null
  }

  const t = (value) => (Number.isNaN(+value) ? i18n.t(`statisticalFactsheets.${section}.${value}`) : value)
  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport tableRef={tableRef} filename={`${section}-${levelIso}`} />
        <table ref={tableRef} className="fra-table">
          <thead>
            <tr>
              {columns.map((key) => (
                <th key={key} className="fra-table__header-cell">
                  {i18n.t(t(key))}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((tableRow) => {
              const row = data.find((entry) => entry.rowName === tableRow) || {}
              return (
                <tr key={tableRow}>
                  {columns.map((column, i) =>
                    i === 0 ? (
                      <th key={`${tableRow}-${column}`} className="fra-table__category-cell">
                        {t(tableRow)}
                      </th>
                    ) : (
                      <td key={`${tableRow}-${column}`} className="fra-table__cell">
                        {t(row[column] || '')}
                      </td>
                    )
                  )}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  levelIso: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
}

export default Table
