import './statisticsTable.scss'
import React, { useRef } from 'react'

import ButtonTableExport from 'client/components/ButtonTableExport'
import { CSVData } from 'client/components/ButtonTableExport/types'

type Props = {
  columns: string[]
  csvData?: CSVData
  units: string[]
  loaded: boolean
  tableData: (string | number)[][]
  countryIso: string
  year?: number
}

const StatisticsTable = (props: Props) => {
  const { columns, countryIso, csvData, loaded, tableData, units, year } = props
  const tableRef = useRef(null)

  if (!loaded) {
    return null
  }

  return (
    <div className="geo-statistics-table__container">
      <table ref={tableRef} cellSpacing="0" className="geo-statistics-table">
        <thead>
          <tr>
            {columns.map((columnName) => (
              <th key={`${columnName}`} className="geo-statistics-table__header-cell">
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIdx) => {
            return (
              <tr key={`${[rowIdx]}`}>
                {row.map((value, columnIdx: number) => (
                  <td key={`${value}-${columns[columnIdx]}`} className="geo-statistics-table__cell">
                    {`${value} ${units[columnIdx]}`}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="geo-statistics-export-button__container">
        <ButtonTableExport
          csvData={csvData}
          filename={`forest-estimations-${countryIso}-${year}`}
          tableRef={tableRef}
        />
      </div>
    </div>
  )
}

StatisticsTable.defaultProps = {
  csvData: undefined,
  year: undefined,
}

export default StatisticsTable
