import { Cycle } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardPieChart } from 'meta/dashboard/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

const cols: Record<string, Array<string>> = {
  '2020': ['2020'],
  '2025': ['2025'],
}

const tableName = 'extentOfForest'
const tableId = 2

const rowMetadata: RowsMetadata = [
  {
    id: 1,
    variableName: 'forestArea',
    label: `statisticalFactsheets.rowName.forestArea`,
    calculateFn: `100 * (${tableName}.forestArea / ${tableName}.totalLandArea)`,
    calculationDependencies: [
      { tableName, variableName: 'forestArea' },
      { tableName, variableName: 'totalLandArea' },
    ],
  },
  {
    id: 2,
    variableName: 'otherLand',
    label: `statisticalFactsheets.rowName.otherArea`,
    calculateFn: `100 - (100 * (${tableName}.forestArea / ${tableName}.totalLandArea))`,
    calculationDependencies: [
      { tableName, variableName: 'forestArea' },
      { tableName, variableName: 'totalLandArea' },
    ],
  },
]

export const forestAreaPercentOfLandArea = (cycle: Cycle): DashboardPieChart => ({
  type: DashboardItemType.pieChart,
  title: { key: 'statisticalFactsheets.forestAreaPercent.title' },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata, tableName }),
  chart: {
    label: ({ variableName, percent }) => `${variableName} ${(percent * 100).toFixed(0)}%`,
    cells: [
      { variableName: 'forestArea', color: ChartColor.green, columnName: cols[cycle.name][0] },
      { variableName: 'otherLand', color: ChartColor.gray, columnName: cols[cycle.name][0] },
    ],
  },
})
