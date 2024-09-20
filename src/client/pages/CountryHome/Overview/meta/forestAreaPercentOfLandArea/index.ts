import { Cycle } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardPieChart } from 'meta/dashboard/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'
import { unit } from 'client/pages/CountryHome/Overview/meta/utils/unit'

const cols: Record<string, Array<string>> = {
  '2020': ['2020'],
  '2025': ['2025'],
}

const tableName = 'extentOfForest'
const tableId = 3

const rowMetadata = (region: boolean): RowsMetadata => [
  {
    id: 1,
    variableName: 'forestArea',
    label: { key: `statisticalFactsheets.rowName.forest` },
    calculateFn: `${tableName}.forestArea ${region ? '/ 1000' : ''}`,
    // calculateFn: `100 * (${tableName}.forestArea / ${tableName}.totalLandArea)`,
    calculationDependencies: [
      { tableName, variableName: 'forestArea' },
      { tableName, variableName: 'totalLandArea' },
    ],
  },
  {
    id: 2,
    variableName: 'otherLand',
    label: { key: `statisticalFactsheets.rowName.otherLand` },
    calculateFn: `${tableName}.totalLandArea ${region ? '/ 1000' : ''} - ${tableName}.forestArea ${
      region ? '/ 1000' : ''
    }`,
    // calculateFn: `100 - (100 * (${tableName}.forestArea / ${tableName}.totalLandArea))`,
    calculationDependencies: [
      { tableName, variableName: 'forestArea' },
      { tableName, variableName: 'totalLandArea' },
    ],
  },
]

export const forestAreaPercentOfLandArea = (cycle: Cycle, region: boolean): DashboardPieChart => ({
  type: DashboardItemType.pieChart,
  title: { key: 'statisticalFactsheets.forestAreaPercent.title', params: { year: cols[cycle.name].at(0) } },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata: rowMetadata(region), tableName }),
  chart: {
    cells: [
      {
        variableName: 'forestArea',
        color: ChartColor.green,
        columnName: cols[cycle.name][0],
        label: { key: 'statisticalFactsheets.rowName.forest' },
        unit: unit(region),
      },
      {
        variableName: 'otherLand',
        color: ChartColor.otherLand,
        columnName: cols[cycle.name][0],
        label: { key: 'statisticalFactsheets.rowName.otherLand' },
        unit: unit(region),
      },
    ],
  },
})
