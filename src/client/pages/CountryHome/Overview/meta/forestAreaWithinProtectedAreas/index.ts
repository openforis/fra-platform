import { Cycle, TableNames } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardPieChart } from 'meta/dashboard/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

const cols: Record<string, Array<string>> = {
  '2020': ['2020'],
  '2025': ['2025'],
}

const tableId = 5
const tableName = 'forestAreaWithinProtectedAreas'
const variableName = 'forest_area_within_protected_areas'

export const forestAreaWithinProtectedAreas = (cycle: Cycle): DashboardPieChart => {
  const columnName = cols[cycle.name][0]
  const rowMetadata: RowsMetadata = [
    {
      id: 1,
      variableName,
      label: `statisticalFactsheets.rowName.forestAreaWithinProtectedAreas`,
      calculateFn: `100 * ${tableName}.${variableName} / ${TableNames.extentOfForest}.forestArea`,
      calculationDependencies: [
        { tableName, variableName },
        { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
      ],
    },
    {
      id: 2,
      variableName: 'forestArea',
      label: `statisticalFactsheets.rowName.forestArea`,
      calculateFn: `100 - 100 * ${tableName}.${variableName} / ${TableNames.extentOfForest}.forestArea`,
      calculationDependencies: [
        { tableName, variableName },
        { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
      ],
    },
  ]

  return {
    type: DashboardItemType.pieChart,
    title: { key: 'statisticalFactsheets.forestAreaWithinProtectedAreas.title' },
    table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata, tableName }),
    chart: {
      label: ({ variableName, percent }) => `${variableName} ${(percent * 100).toFixed(0)}%`,
      cells: [
        {
          variableName: 'forestArea',
          color: ChartColor.green,
          columnName,
        },
        {
          variableName,
          color: ChartColor.lightGreen,
          columnName,
        },
      ],
    },
  }
}
