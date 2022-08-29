import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { Areas } from '@core/country'
import { Objects } from '@core/utils'
import { Numbers } from '@core/utils/numbers'

import { TableNames } from '@meta/assessment'
import { TableData, TableDatas } from '@meta/data'

import { useCountryIso } from '@client/hooks'
import ButtonTableExport from '@client/components/ButtonTableExport'

import { formatValue } from '../../utils/numberUtils'

type Props = {
  columns: string[]
  variables: string[]
  units: string[]
  tableNames: string[]
  sectionName: string
  loaded: boolean
  tableData: TableData
}

const Table = (props: Props) => {
  const countryIso = useCountryIso()
  const isIsoCountry = Areas.isISOCountry(countryIso)

  const i18n = useTranslation()
  const { columns, variables, tableNames: _tableNames, units, sectionName, tableData, loaded } = props
  const tableRef = useRef(null)

  const tableNames = isIsoCountry ? _tableNames : [TableNames.valueAggregate]

  if (!loaded) {
    return null
  }

  const t = (value: string | number) => {
    if (!value) return ''
    return Number.isNaN(+value)
      ? i18n.t<string>(`statisticalFactsheets.${sectionName}.${value}`)
      : Numbers.format(Number(value))
  }

  return (
    <div className="fra-table__container">
      <div className="fra-table__scroll-wrapper">
        <ButtonTableExport tableRef={tableRef} filename={`${sectionName}-${countryIso}`} />
        <table ref={tableRef} className="fra-table">
          <thead>
            <tr>
              {['rowName', ...columns].map((key, id) => (
                <th key={key} className="fra-table__header-cell">
                  {String(id === 0 ? t(key) : key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variables.map((variable: string, rowIdx: number) => {
              return (
                <tr key={variable}>
                  {['', ...columns].map((column: string, i: number) => {
                    if (i === 0)
                      return (
                        <th key={`${variable}-${column}`} className="fra-table__category-cell">
                          {`${t(variable)} (${i18n.t<string>(`unit.${units[rowIdx]}`)})`}
                        </th>
                      )
                    const nodeValue = TableDatas.getNodeValue({
                      variableName: variable,
                      tableName: tableNames[0],
                      colName: column,
                      data: tableData,
                      countryIso,
                    })
                    const value = isIsoCountry
                      ? !Objects.isEmpty(nodeValue?.raw) && Numbers.format(Number(nodeValue?.raw))?.toString()
                      : formatValue(Number(nodeValue?.raw || ''), isIsoCountry, variable)
                    return (
                      <td key={`${variable}-${column}`} className="fra-table__cell">
                        {value || '-'}
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
