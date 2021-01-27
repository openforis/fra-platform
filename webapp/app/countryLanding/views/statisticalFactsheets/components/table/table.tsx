import React, { useRef } from 'react'
import { useI18n } from '@webapp/components/hooks'
import ButtonTableExport from '@webapp/components/buttonTableExport'
import { formatValue } from '@webapp/app/countryLanding/views/statisticalFactsheets/utils/numberUtils'
import useStatisticalFactsheetsState from '../../hooks/useStatisticalFactsheetsState'

type OwnProps = {
  columns: any[]
  rows: any[]
  units: any[]
  levelIso: string
  section: string
  isIsoCountry?: boolean
}
// @ts-expect-error ts-migrate(2456) FIXME: Type alias 'Props' circularly references itself.
type Props = OwnProps & typeof Table.defaultProps
// @ts-expect-error ts-migrate(7022) FIXME: 'Table' implicitly has type 'any' because it does ... Remove this comment to see the full error message
const Table = (props: Props) => {
  const i18n = useI18n()
  const { columns, rows, section, levelIso, units, isIsoCountry } = props
  const tableRef = useRef(null)
  const { data, loaded } = useStatisticalFactsheetsState(section, levelIso)
  if (!loaded) {
    return null
  }
  const t = (value: any) =>
    Number.isNaN(+value) ? (i18n as any).t(`statisticalFactsheets.${section}.${value}`) : value
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
                        {`${t(tableRow)} (${(i18n as any).t(`unit.${units[rowIdx]}`)})`}
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
