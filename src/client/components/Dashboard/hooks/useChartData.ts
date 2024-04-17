import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { PieChart, PieChartData } from 'meta/chart'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useData } from 'client/components/Dashboard/hooks/useData'

export const useChartData = (table: Table, chart: PieChart): Array<PieChartData> => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const data = useData(table)

  const tableData = RecordAssessmentDatas.getTableData({
    assessmentName,
    cycleName,
    countryIso,
    tableName: table.props.name,
    data,
  })

  if (!tableData?.[cycleName]) return []

  return chart.cells.map((cell) => ({
    name: cell.key,
    value: parseFloat(tableData[cycleName][cell.key].raw),
    color: cell.color,
  }))
}
