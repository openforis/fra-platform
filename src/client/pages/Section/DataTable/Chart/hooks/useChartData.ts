import { useMemo } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area/countryIso'
import { Table } from 'meta/assessment/table'
import { RecordAssessmentData, RecordColumnData } from 'meta/data/recordData'
import { RecordAssessmentDatas } from 'meta/data/recordDatas'

import { useCycle } from 'client/store/meta/hooks/cycles'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useIsPrintRoute } from 'client/hooks/routes'
import { RecordTrendData, TrendDatum, Trends, TrendsYears } from 'client/pages/Section/DataTable/Chart/types'

type Props = {
  data: RecordAssessmentData
  table: Table
  trends: Trends
}

type Returned = {
  trendsData: RecordTrendData
  years?: TrendsYears
}

export const useChartData = (props: Props): Returned => {
  const { data, table, trends } = props

  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const cycle = useCycle()
  const { print } = useIsPrintRoute()

  const { columnNames, name: tableName, report: tableReport } = table.props
  const { uuid: cycleUuid } = cycle
  const columnsReport = tableReport?.[cycleUuid]?.columnsReport

  const tableData = useMemo<RecordColumnData>(() => {
    return RecordAssessmentDatas.getTableData({ assessmentName, cycleName, countryIso, tableName, data })
  }, [assessmentName, countryIso, cycleName, data, tableName])

  return useMemo<Returned>(() => {
    const yearsSet = new Set<number>(columnNames[cycleUuid].map((colName) => Number(colName)))

    const trendsData = trends.reduce<Returned['trendsData']>((acc, trend) => ({ ...acc, [trend.name]: [] }), {})
    Object.entries(tableData).forEach(([colName, rowData]) => {
      trends.forEach((trend) => {
        const { name: trendName } = trend
        const nodeValue = rowData?.[trendName]

        const exclude =
          Objects.isNil(nodeValue?.raw) || (print && !Objects.isNil(columnsReport) && !columnsReport.includes(colName))
        // add datum to its trend
        if (!exclude) {
          const year = Number(colName)
          yearsSet.add(year)

          // dataSourceMethods ?? not in the data atm
          const estimated = Boolean(nodeValue?.estimationUuid)
          const type = Objects.isNil(nodeValue?.odpId) ? 'fra' : 'odp'
          const value = Number(nodeValue?.raw)
          const datum: TrendDatum = { estimated, year, type, value }
          trendsData[trendName].push(datum)
        }
      })
    })
    const all = Array.from(yearsSet)
    const years = yearsSet.size > 0 ? { all, max: Math.max(...all) + 1, min: Math.min(...all) - 1 } : undefined

    return { trendsData, years }
  }, [columnNames, columnsReport, cycleUuid, print, tableData, trends])
}
