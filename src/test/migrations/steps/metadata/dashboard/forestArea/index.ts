import { Cycle, Unit } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardBarChart, DashboardItemType } from 'meta/dashboard'

import { getTable, RowsMetadata } from '../utils'

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
    label: { key: `statisticalFactsheets.rowName.area` },
    calculateFn: `${tableName}.forestArea ${region ? '/ 1000' : ''}`,
    calculationDependencies: [{ tableName, variableName: 'forestArea' }],
  },
]

export const forestArea = (cycle: Cycle, region: boolean): DashboardBarChart => ({
  type: DashboardItemType.barChart,
  title: {
    key: 'statisticalFactsheets.forestArea.title',
    params: { startYear: cols[cycle.name].at(0), endYear: cols[cycle.name].at(-1), unit: `unit.${Unit.haThousand}` },
  },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata: rowMetadata(region), tableName }),
  chart: {
    columns: cols[cycle.name],
    cells: [
      {
        variableName: 'forestArea',
        color: ChartColor.green,
        label: { key: 'statisticalFactsheets.rowName.area' },
        unit: `unit.${Unit.haThousand}`,
      },
    ],
    xAxis: { label: { key: 'common.year' } },
    yAxis: { label: { key: `unit.${Unit.haThousand}` } },
  },
})
