import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { BarChart, BarChartData } from 'meta/chart'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useData } from 'client/components/Dashboard/hooks/useData'

export const useBarChartData = (table: Table, chart: BarChart): BarChartData => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const data = useData(table)

  const tableData = RecordAssessmentDatas.getTableData({
    assessmentName,
    cycleName,
    countryIso,
    tableName: table.props.name,
    data,
  })

  return useMemo<BarChartData>(() => {
    if (Objects.isEmpty(tableData)) return []

    return chart.columns.map((columnName) => {
      return chart.cells.reduce((acc, cell) => {
        return {
          ...acc,
          columnName,
          [cell.variableName]: parseFloat(tableData[columnName][cell.variableName].raw),
        }
      }, {})
    })
  }, [chart.columns, chart.cells, tableData])
}
