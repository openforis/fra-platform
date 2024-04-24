import { Cycle, TableNames } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardBarChart } from 'meta/dashboard/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

const commonColumns = ['1990', '2000', '2010', '2020']

const cols: Record<string, Array<string>> = {
  '2020': commonColumns,
  '2025': [...commonColumns, '2025'],
}

const cells = [
  { variableName: 'naturalForestArea', color: ChartColor.green },
  { variableName: 'plantedForest', color: ChartColor.orange },
]

const tableName = TableNames.forestCharacteristics
const tableId = 8

const rowMetadata: RowsMetadata = [
  ...cells.map(({ variableName }, i) => ({
    id: i + 1,
    variableName,
    label: `statisticalFactsheets.rowName.${variableName}`,
    calculateFn: `${tableName}.${variableName}`,
    calculationDependencies: [{ tableName, variableName }],
  })),
]

export const naturallyRegeneratingForestArea = (cycle: Cycle): DashboardBarChart => ({
  type: DashboardItemType.barChart,
  title: {
    key: 'statisticalFactsheets.naturallyRegeneratingForest.title',
    params: { startYear: cols[cycle.name].at(0), endYear: cols[cycle.name].at(-1) },
  },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata, tableName }),
  chart: {
    columns: cols[cycle.name],
    label: ({ variableName, percent }: any) => `${variableName} ${(percent * 100).toFixed(0)}%`,
    cells,
    xAxis: { label: { key: 'common.year' } },
    yAxis: { label: { key: 'unit.haThousand' } },
  },
})
