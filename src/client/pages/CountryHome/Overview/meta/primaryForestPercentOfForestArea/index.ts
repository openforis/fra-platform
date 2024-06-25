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

const tableId = 4
const tableNames: Record<string, TableNames> = {
  '2020': TableNames.specificForestCategories,
  '2025': TableNames.forestCharacteristics,
}

const variableNames: Record<string, string> = {
  '2020': 'primary_forest',
  '2025': 'primaryForest',
}

export const primaryForestPercentOfForestArea = (cycle: Cycle): DashboardPieChart => {
  const columnName = cols[cycle.name][0]
  const tableName = tableNames[cycle.name]
  const variableName = variableNames[cycle.name]

  // const calculateFnPrimaryForest = `100 * (${tableName}.${variableName} / ${TableNames.extentOfForest}.forestArea)`
  // const calculateFnOtherLand = `100 - (100 * (${tableName}.${variableName} / ${TableNames.extentOfForest}.forestArea))`

  const rowMetadata: Record<string, RowsMetadata> = {
    '2020': [
      {
        id: 1,
        variableName,
        label: `statisticalFactsheets.rowName.primaryForest`,
        calculateFn: `${tableName}.${variableName}`,
        calculationDependencies: [
          { tableName, variableName },
          { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
        ],
      },
      {
        id: 2,
        variableName: 'otherLand',
        label: `statisticalFactsheets.rowName.otherArea`,
        calculateFn: `${TableNames.extentOfForest}.forestArea - ${tableName}.${variableName}`,
        calculationDependencies: [
          { tableName, variableName },
          { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
        ],
      },
    ],
    '2025': [
      {
        id: 1,
        variableName: 'primaryForest',
        label: `statisticalFactsheets.rowName.primaryForest`,
        calculateFn: `${tableName}.${variableName}`,
        calculationDependencies: [
          { tableName, variableName },
          { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
        ],
      },
      {
        id: 2,
        variableName: 'otherLand',
        label: `statisticalFactsheets.rowName.otherArea`,
        calculateFn: `${TableNames.extentOfForest}.forestArea - ${tableName}.${variableName}`,
        calculationDependencies: [
          { tableName, variableName },
          { tableName: TableNames.extentOfForest, variableName: 'forestArea' },
        ],
      },
    ],
  }

  return {
    type: DashboardItemType.pieChart,
    title: { key: 'statisticalFactsheets.primaryForest.title', params: { year: cols[cycle.name].at(0) } },
    table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata: rowMetadata[cycle.name], tableName }),
    chart: {
      cells: [
        {
          variableName,
          color: ChartColor.forestLight,
          columnName,
          label: { key: 'statisticalFactsheets.rowName.primaryForest' },
        },
        {
          variableName: 'otherLand',
          color: ChartColor.otherLand,
          columnName,
          label: { key: 'statisticalFactsheets.rowName.otherForest' },
        },
      ],
    },
  }
}
