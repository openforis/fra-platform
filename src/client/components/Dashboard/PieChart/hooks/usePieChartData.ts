import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Labels } from 'meta/assessment/labels'
import { Table } from 'meta/assessment/table'
import { PieChart, PieChartData } from 'meta/chart'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { DashboardCSVData } from 'client/components/Dashboard/ButtonDataExport/ButtonDataExport'
import { useData } from 'client/components/Dashboard/hooks/useData'

type Returned = { data: Array<PieChartData>; csvData: Array<DashboardCSVData> }

export const usePieChartData = (table: Table, chart: PieChart): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { t } = useTranslation()
  const data = useData(table)

  const tableData = RecordAssessmentDatas.getTableData({
    assessmentName,
    cycleName,
    countryIso,
    tableName: table.props.name,
    data,
  })

  return useMemo<Returned>((): Returned => {
    if (Objects.isEmpty(tableData)) return { data: [], csvData: [] }

    const data = chart.cells.map((cell) => {
      return {
        ...cell,
        value: parseFloat(tableData[cell.columnName][cell.variableName].raw),
      }
    })

    const csvData = data.map((pieData) => {
      const { columnName, label, unit, value } = pieData
      return {
        variable: Labels.getLabel({ label, t }),
        column: columnName,
        value,
        unit: t(unit),
      }
    })

    return { data, csvData }
  }, [chart.cells, t, tableData])
}
