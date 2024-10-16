import { Cycle, TableNames } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardPieChart } from 'meta/dashboard/dashboard'

import { getTable, RowsMetadata } from '../utils'
import { unit } from '../utils/unit'

const cols: Record<string, Array<string>> = {
  '2020': ['2020'],
  '2025': ['2025'],
}

const tableId = 5
const tableName = 'forestAreaWithinProtectedAreas'
const variableName = 'forest_area_within_protected_areas'

export const forestAreaWithinProtectedAreas = (cycle: Cycle, region: boolean): DashboardPieChart => {
  const columnName = cols[cycle.name][0]
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
      calculateFn: `${TableNames.extentOfForest}.forestArea ${region ? '/ 1000' : ''} - ${tableName}.${variableName} ${
        region ? '/ 1000' : ''
      }`,
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
