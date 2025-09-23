import { getTable, RowsMetadata } from 'tools/migrations/steps/steps/metadata/dashboard/utils'
import { unit } from 'tools/migrations/steps/steps/metadata/dashboard/utils/unit'

import { Cycle } from 'meta/assessment/cycle'
import { TableNames } from 'meta/assessment/table'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardPieChart } from 'meta/dashboard/dashboard'

const cols: Record<string, Array<string>> = {
  '2020': ['2020'],
  '2025': ['2025'],
}

const tableId = 5
const tableName = 'forestAreaWithinProtectedAreas'
const variableName = 'forest_area_within_protected_areas'

export const forestAreaWithinProtectedAreas = (cycle: Cycle, region: boolean): DashboardPieChart => {
  const columnName = cols[cycle.name][0]
  const is2025 = cycle.name === '2025'
  const rowMetadata: RowsMetadata = [
    {
      id: 1,
      variableName,
      label: { key: `statisticalFactsheets.rowName.protected` },
      calculateFn: `${tableName}.${variableName} ${region ? '/ 1000' : ''}`,
      // calculateFn: `100 * ${tableName}.${variableName} / ${TableNames.extentOfForest}.forestArea`,
      calculationDependencies: [
        { tableName, variableName },
        { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
      ],
    },
    {
      id: 2,
      variableName: 'forestArea',
      label: { key: `statisticalFactsheets.rowName.other` },
      calculateFn: `${TableNames.extentOfForest}.forestArea${is2025 ? '__protectedArea' : ''} ${
        region ? '/ 1000' : ''
      } - ${tableName}.${variableName} ${region ? '/ 1000' : ''}`,
      // calculateFn: `100 - 100 * ${tableName}.${variableName} / ${TableNames.extentOfForest}.forestArea`,
      calculationDependencies: [
        { tableName, variableName },
        { tableName: TableNames.extentOfForest, variableName: `forestArea${is2025 ? '__protectedArea' : ''}` },
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
          label: { key: 'statisticalFactsheets.rowName.other' },
          unit: unit(region),
        },
        {
          variableName,
          color: ChartColor.forestLight,
          columnName,
          label: { key: 'statisticalFactsheets.rowName.protected' },
          unit: unit(region),
        },
      ],
    },
  }
}
