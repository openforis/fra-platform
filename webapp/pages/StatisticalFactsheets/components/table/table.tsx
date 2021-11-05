import React, { useRef } from 'react'
import { useI18n } from '@webapp/hooks'
import ButtonTableExport from '@webapp/components/ButtonTableExport'
import { formatValue } from '@webapp/pages/StatisticalFactsheets/utils/numberUtils'
import { Numbers } from '@core/utils/numbers'
import useStatisticalFactsheetsState from '../../hooks/useStatisticalFactsheetsState'

type Props = {
  columns: any[]
  rows: any[]
  units: any[]
  levelIso: string
  section: string
  isIsoCountry?: boolean
}

const Table = (props: Props) => {
  const i18n = useI18n()
  const { columns, rows, section, levelIso, units, isIsoCountry } = props
  const tableRef = useRef(null)
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  if (!loaded) {
    return null
  }
  const t = (value: string | number) => {
    if (!value) return ''
    return Number.isNaN(+value) ? i18n.t(`statisticalFactsheets.${section}.${value}`) : Numbers.format(value)
  }
  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport tableRef={tableRef} filename={`${section}-${levelIso}`} />
        <table ref={tableRef} className="fra-table">
          <thead>
            <tr>
              {columns.map((key: any) => (
                <th key={key} className="fra-table__header-cell">
                  {t(key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((tableRow: any, rowIdx: any) => {
              const row = data.find((entry: any) => entry.rowName === tableRow) || {}
              return (
                <tr key={tableRow}>
                  {columns.map((column: any, i: any) =>
                    i === 0 ? (
                      <th key={`${tableRow}-${column}`} className="fra-table__category-cell">
                        {`${t(tableRow)} (${i18n.t(`unit.${units[rowIdx]}`)})`}
                      </th>
                    ) : (
                      <td key={`${tableRow}-${column}`} className="fra-table__cell">
                        {formatValue(t(row[column] || ''), isIsoCountry, row.rowName) || '-'}
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
export default Table
