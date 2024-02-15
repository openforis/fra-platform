import './statisticsTable.scss'
import React, { useRef } from 'react'

import ButtonStatisticsTableExport from 'client/pages/Geo/GeoMap/components/ButtonStatisticsTableExport'
import { CustomCsvDownload } from 'client/pages/Geo/GeoMap/components/ButtonStatisticsTableExport/types'

type Props = {
  columns: string[]
  customCsvDownload?: CustomCsvDownload
  units: string[]
  loaded: boolean
  tableData: (string | number)[][]
  countryIso: string
  year?: number
}

const StatisticsTable = (props: Props) => {
  const { columns, customCsvDownload, units, loaded, tableData, countryIso, year } = props
  const tableRef = useRef(null)

  if (!loaded) {
    return null
  }

  return (
    <div className="statistics-table__container">
      <table ref={tableRef} className="statistics-table" cellSpacing="0">
        <thead>
          <tr>
            {columns.map((columnName) => (
              <th key={`${columnName}`} className="statistics-table__header-cell">
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
                  <td key={`${value}-${columns[columnIdx]}`} className="statistics-table__cell">
                    {`${value} ${units[columnIdx]}`}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      <ButtonStatisticsTableExport
        tableRef={tableRef}
        filename={`forest-estimations-${countryIso}-${year}`}
        customCsvDownload={customCsvDownload}
      />
    </div>
  )
}

StatisticsTable.defaultProps = {
  year: undefined,
  customCsvDownload: undefined,
}

export default StatisticsTable
