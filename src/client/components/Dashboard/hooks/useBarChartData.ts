import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { BarChart, BarChartData } from 'meta/chart'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useData } from './useData'

export const useBarChartData = (table: Table, chart: BarChart): { data: BarChartData; hasData: boolean } => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const _data = useData(table)

  const tableData = RecordAssessmentDatas.getTableData({
    assessmentName,
    cycleName,
    countryIso,
    tableName: table.props.name,
    data: _data,
  })

  if (Objects.isEmpty(tableData)) return { data: [], hasData: false }

  let hasData = false

  const data = chart.columns.map((columnName) => {
    return chart.cells.reduce((acc, cell) => {
      if (!Objects.isEmpty(tableData[columnName][cell.variableName].raw)) hasData = true
      return {
        ...acc,
        columnName,
        [cell.variableName]: parseFloat(tableData[columnName][cell.variableName].raw),
      }
    }, {})
  })

  return { data, hasData }
}
