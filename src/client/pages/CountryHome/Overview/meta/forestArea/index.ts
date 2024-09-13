import { Cycle } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardBarChart } from 'meta/dashboard/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'
import { unit } from 'client/pages/CountryHome/Overview/meta/utils/unit'

const commonColumns = ['1990', '2000', '2010', '2020']

const cols: Record<string, Array<string>> = {
  '2020': commonColumns,
  '2025': [...commonColumns, '2025'],
}

const tableName = 'extentOfForest'
const tableId = 1

const rowMetadata = (region: boolean): RowsMetadata => [
  {
    id: 1,
    variableName: 'forestArea',
    label: { key: `statisticalFactsheets.rowName.forestArea` },
    calculateFn: `${tableName}.forestArea ${region ? '/ 1000' : ''}`,
    calculationDependencies: [{ tableName, variableName: 'forestArea' }],
  },
]

export const forestArea = (cycle: Cycle, region: boolean): DashboardBarChart => ({
  type: DashboardItemType.barChart,
  title: {
    key: 'statisticalFactsheets.forestArea.title',
    params: { startYear: cols[cycle.name].at(0), endYear: cols[cycle.name].at(-1), unit: unit(region) },
  },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata: rowMetadata(region), tableName }),
  chart: {
    columns: cols[cycle.name],
    label: ({ variableName, percent }: any) => `${variableName} ${(percent * 100).toFixed(0)}%`,
    cells: [
      {
        variableName: 'forestArea',
        color: ChartColor.green,
        label: { key: 'statisticalFactsheets.rowName.area' },
        unit: unit(region),
      },
    ],
    xAxis: { label: { key: 'common.year' } },
    yAxis: { label: { key: unit(region) } },
  },
})
