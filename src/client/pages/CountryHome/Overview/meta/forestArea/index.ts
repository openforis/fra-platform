import { Cycle } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardBarChart } from 'meta/dashboard/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

const commonColumns = ['1990', '2000', '2010']

const cols: Record<string, Array<string>> = {
  '2020': [...commonColumns, '2020'],
  '2025': [...commonColumns, '2025'],
}

const tableName = 'extentOfForest'
const tableId = 1

const rowMetadata: RowsMetadata = [
  {
    id: 1,
    variableName: 'forestArea',
    label: `statisticalFactsheets.rowName.forestArea`,
    calculateFn: `${tableName}.forestArea`,
    calculationDependencies: [{ tableName, variableName: 'forestArea' }],
  },
]

export const forestArea = (cycle: Cycle): DashboardBarChart => ({
  type: DashboardItemType.barChart,
  title: { key: 'statisticalFactsheets.forestArea.title' },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata, tableName }),
  chart: {
    columns: cols[cycle.name],
    label: ({ variableName, percent }: any) => `${variableName} ${(percent * 100).toFixed(0)}%`,
    cells: [{ variableName: 'forestArea', color: ChartColor.green }],
  },
})
