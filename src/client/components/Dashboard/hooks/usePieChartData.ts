import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { PieChart, PieChartData } from 'meta/chart'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useData } from './useData'

export const usePieChartData = (table: Table, chart: PieChart): { data: Array<PieChartData>; hasData: boolean } => {
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

  const data = chart.cells.map((cell) => {
    if (!Objects.isEmpty(tableData[cell.columnName][cell.variableName].raw)) hasData = true
    return {
      ...cell,
      value: parseFloat(tableData[cell.columnName][cell.variableName].raw),
    }
  })
  return { data, hasData }
}
