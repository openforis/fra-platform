import './StatisticsTable.scss'
import React, { useRef } from 'react'

import { Objects } from 'utils/objects'

import { ButtonSize } from 'client/components/Buttons/Button'
import { ButtonGridExport, DataCell, DataGrid } from 'client/components/DataGrid'
import ButtonCSVExport from 'client/pages/Geo/ButtonCSVExport'
import { CSVData } from 'client/pages/Geo/ButtonCSVExport/types'
import { StatisticsTableData } from 'client/pages/Geo/StatisticsSidePanel/StatisticsTable/types'

type Props = {
  columns: string[]
  csvData?: CSVData
  fileName: string
  gridTemplateColumns?: string
  loaded: boolean
  tableData: StatisticsTableData
  units: string[]
}

const StatisticsTable = (props: Props) => {
  const { columns, csvData, fileName, gridTemplateColumns, loaded, tableData, units } = props

  const gridRef = useRef<HTMLDivElement>(null)

  if (!loaded) {
    return null
  }

  return (
    <div className="geo-statistics-table__container">
      <div className="geo-statistics-export-button__container">
        {!Objects.isEmpty(csvData) && <ButtonCSVExport csvData={csvData} filename={fileName} />}
        {Objects.isEmpty(csvData) && <ButtonGridExport filename={fileName} gridRef={gridRef} size={ButtonSize.xs} />}
      </div>

      <DataGrid ref={gridRef} gridTemplateColumns={gridTemplateColumns ?? `repeat(${columns.length}, 1fr)`}>
        {columns.map((columnTitle, i) => {
          return (
            <DataCell key={`${columnTitle}-${String(i)}-header`} header lastCol={i === columns.length - 1}>
              {columnTitle}
            </DataCell>
          )
        })}

        {tableData.map((row, i) => {
          return (
            <React.Fragment key={`row_${String(i)}`}>
              {row.map((entry, j) => {
                return (
                  <DataCell
                    key={`${entry.value}-${String(i)}-${String(j)}`}
                    lastCol={j === columns.length - 1}
                    lastRow={i === tableData.length - 1}
                  >
                    {entry.color && (
                      <div className="geo-table__layer-legend" style={{ backgroundColor: entry.color }} />
                    )}
                    {`${entry.value} ${units[j]}`}
                  </DataCell>
                )
              })}
            </React.Fragment>
          )
        })}
      </DataGrid>
    </div>
  )
}

StatisticsTable.defaultProps = {
  csvData: undefined,
  gridTemplateColumns: undefined,
}

export default StatisticsTable
