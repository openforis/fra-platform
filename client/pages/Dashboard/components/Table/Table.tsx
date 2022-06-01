import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@core/country'
import { Numbers } from '@core/utils/numbers'

import { useCountryIso } from '@client/hooks'
import ButtonTableExport from '@client/components/ButtonTableExport'

import useStatisticalFactsheetsState from '../../hooks/useDashboardData'
import { formatValue } from '../../utils/numberUtils'

type Props = {
  columns: any[]
  variables: any[]
  units: any[]
  tableNames: string[]
  section: string
}

const Table = (props: Props) => {
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const i18n = useTranslation()
  const { columns, variables, tableNames, units, section } = props
  const tableRef = useRef(null)

  const { data: tableData, loaded } = useStatisticalFactsheetsState({
    columns,
    tableNames,
    variables,
  })

  if (!loaded) {
    return null
  }

  const t = (value: string | number) => {
    if (!value) return ''
    return Number.isNaN(+value) ? i18n.t(`statisticalFactsheets.${section}.${value}`) : Numbers.format(Number(value))
  }

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport tableRef={tableRef} filename={`${section}-${countryIso}`} />
        <table ref={tableRef} className="fra-table">
          <thead>
            <tr>
              {['rowName', ...columns].map((key: any, id) => (
                <th key={key} className="fra-table__header-cell">
                  {id === 0 ? t(key) : key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variables.map((variable: string, rowIdx: number) => {
              return (
                <tr key={variable}>
                  {['', ...columns].map((column: any, i: any) => {
                    if (i === 0)
                      return (
                        <th key={`${variable}-${column}`} className="fra-table__category-cell">
                          {`${t(variable)} (${i18n.t(`unit.${units[rowIdx]}`)})`}
                        </th>
                      )
                    // const row = data.find((entry: any) => entry.rowName === tableRow) || {}
                    const nodeValue = tableData[countryIso][tableNames[0]][column]?.[variable]

                    return (
                      <td key={`${variable}-${column}`} className="fra-table__cell">
                        {formatValue(nodeValue?.raw || '', isIsoCountry, variable) || '-'}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table
