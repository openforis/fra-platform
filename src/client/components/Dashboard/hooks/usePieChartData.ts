import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { PieChart, PieChartData } from 'meta/chart'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

import { useData } from './useData'

export const usePieChartData = (table: Table, chart: PieChart): Array<PieChartData> => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const data = useData(table)

  const tableData = RecordAssessmentDatas.getTableData({
    assessmentName,
    cycleName,
    countryIso,
    tableName: table.props.name,
    data,
  })

  if (Objects.isEmpty(tableData)) return []

  return chart.cells.map((cell) => {
    return {
      variableName: cell.variableName,
      value: parseFloat(tableData[cell.columnName][cell.variableName].raw),
      columnName: cell.columnName,
      color: cell.color,
    }
  })
}
