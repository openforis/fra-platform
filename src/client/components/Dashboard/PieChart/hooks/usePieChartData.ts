import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Table } from 'meta/assessment'
import { PieChart, PieChartData } from 'meta/chart'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { useData } from 'client/components/Dashboard/hooks/useData'

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

  return useMemo<Array<PieChartData>>(() => {
    if (Objects.isEmpty(tableData)) return []

    if (Objects.isEmpty(tableData)) return []
    return chart.cells.map((cell) => {
      return {
        ...cell,
        value: parseFloat(tableData[cell.columnName][cell.variableName].raw),
      }
    })
  }, [chart.cells, tableData])
}
