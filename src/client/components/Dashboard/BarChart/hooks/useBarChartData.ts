import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Labels } from 'meta/assessment/labels'
import { Table } from 'meta/assessment/table'
import { BarChart, BarChartData } from 'meta/chart'
import { RecordAssessmentDatas } from 'meta/data'

import { useCountryRouteParams } from 'client/hooks/routeParams'
import { DashboardCSVData } from 'client/components/Dashboard/ButtonDataExport/ButtonDataExport'
import { useData } from 'client/components/Dashboard/hooks/useData'

type Returned = { data: BarChartData; csvData: Array<DashboardCSVData> }

export const useBarChartData = (table: Table, chart: BarChart): Returned => {
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

    const data: BarChartData = chart.columns.map((columnName) => {
      return chart.cells.reduce((acc, cell) => {
        return {
          ...acc,
          columnName,
          [cell.variableName]: parseFloat(tableData[columnName][cell.variableName].raw),
        }
      }, {})
    })

    const csvData: Array<DashboardCSVData> = []

    data.forEach((barData) => {
      const { columnName } = barData
      chart.cells.forEach((cell) => {
        const value = barData[cell.variableName]
        if (value !== undefined) {
          csvData.push({
            variable: Labels.getLabel({ label: cell.label, t }),
            column: String(columnName),
            value,
            unit: cell.unit ? t(cell.unit) : '',
          })
        }
      })
    })

    return { data, csvData }
  }, [chart.cells, chart.columns, t, tableData])
}
