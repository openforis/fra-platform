import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import { formatValue } from '@webapp/app/countryLanding/views/statisticalFactsheets/utils/numberUtils'

import useStatisticalFactsheetsState from '../../hooks/useStatisticalFactsheetsState'

const Table = (props) => {
  const i18n = useI18n()
  const { columns, rows, section, levelIso, units, isIsoCountry } = props
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
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((tableRow, rowIdx) => {
              const row = data.find((entry) => entry.rowName === tableRow) || {}
              return (
                <tr key={tableRow}>
                  {columns.map((column, i) =>
                    i === 0 ? (
                      <th key={`${tableRow}-${column}`} className="fra-table__category-cell">
                        {`${t(tableRow)} (${i18n.t(`unit.${units[rowIdx]}`)})`}
                      </th>
                    ) : (
                      <td key={`${tableRow}-${column}`} className="fra-table__cell">
                        {formatValue(t(row[column] || ''), isIsoCountry, row.rowName)}
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

Table.defaultProps = {
  isIsoCountry: false,
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  units: PropTypes.array.isRequired,
  levelIso: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
  isIsoCountry: PropTypes.bool,
}

export default Table
