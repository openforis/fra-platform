import { CountryIso } from 'meta/area'
import { PieChart, PieChartData } from 'meta/chart'
import { RecordAssessmentData, RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useChartData = (data: RecordAssessmentData, chart: PieChart): Array<PieChartData> => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const tableData = RecordAssessmentDatas.getTableData({
    assessmentName,
    cycleName,
    countryIso,
    tableName: chart.name,
    data,
  })

  if (!tableData?.[cycleName]) return []

  return chart.cells.map((cell) => ({
    name: cell.key,
    value: parseFloat(tableData[cycleName][cell.key].raw),
    color: cell.color,
  }))
}
