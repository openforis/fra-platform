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
      label: { key: `statisticalFactsheets.rowName.forestAreaWithinProtectedAreas` },
      calculateFn: `${tableName}.${variableName}`,
      // calculateFn: `100 * ${tableName}.${variableName} / ${TableNames.extentOfForest}.forestArea`,
      calculationDependencies: [
        { tableName, variableName },
        { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
      ],
    },
    {
      id: 2,
      variableName: 'forestArea',
      label: { key: `statisticalFactsheets.rowName.forestArea` },
      calculateFn: `${TableNames.extentOfForest}.forestArea - ${tableName}.${variableName}`,
      // calculateFn: `100 - 100 * ${tableName}.${variableName} / ${TableNames.extentOfForest}.forestArea`,
      calculationDependencies: [
        { tableName, variableName },
        { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
      ],
    },
  ]

  return {
    type: DashboardItemType.pieChart,
    title: { key: 'statisticalFactsheets.forestAreaWithinProtectedAreas.title', params: { year: columnName } },
    table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata, tableName }),
    chart: {
      cells: [
        {
          variableName: 'forestArea',
          color: ChartColor.green,
          columnName,
          label: { key: 'statisticalFactsheets.rowName.forestArea' },
          unit: 'unit.haThousand',
        },
        {
          variableName,
          color: ChartColor.forestLight,
          columnName,
          label: { key: 'statisticalFactsheets.rowName.forestAreaWithinProtectedAreas' },
          unit: 'unit.haThousand',
        },
      ],
    },
  }
}
