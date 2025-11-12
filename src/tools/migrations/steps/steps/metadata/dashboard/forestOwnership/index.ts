import { getTable, RowsMetadata } from 'tools/migrations/steps/steps/metadata/dashboard/utils'
import { unit } from 'tools/migrations/steps/steps/metadata/dashboard/utils/unit'

import { Cycle, CycleName } from 'meta/assessment/cycle'
import { ChartColor } from 'meta/chart/color'
import { DashboardItemType, DashboardPieChart } from 'meta/dashboard'

const tableId = 6
const tableName = 'forestOwnership'

const variableNames: Array<{ variableName: string; color: ChartColor; cycleName?: CycleName }> = [
  { variableName: 'private_ownership', color: ChartColor.private },
  { variableName: 'public_ownership', color: ChartColor.public },
  { variableName: 'other', color: ChartColor.otherLand, cycleName: '2025' },
  { variableName: 'unknown', color: ChartColor.unknown, cycleName: '2025' },
  { variableName: 'other_or_unknown', color: ChartColor.otherLand, cycleName: '2020' },
]

const cols: Record<CycleName, Array<string>> = {
  '2020': ['2015'],
  '2025': ['2020'],
}

export const forestOwnership = (cycle: Cycle, region: boolean): DashboardPieChart => {
  const columnName = cols[cycle.name][0]
  const variables = variableNames.filter(({ cycleName }) => !cycleName || cycleName === cycle.name)

  const rowMetadata: RowsMetadata = variables.map(({ variableName }) => ({
    id: 1,
    variableName,
    label: { key: `statisticalFactsheets.rowName.${variableName}` },
    calculateFn: `${tableName}.${variableName} ${region ? '/ 1000' : ''}`,
    calculationDependencies: [{ tableName, variableName }],
  }))

  return {
    type: DashboardItemType.pieChart,
    title: { key: 'statisticalFactsheets.forestOwnership.title', params: { year: columnName } },
    table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata, tableName }),
    chart: {
      cells: variables.map(({ color, variableName }) => ({
        variableName,
        color,
        columnName,
        label: { key: `statisticalFactsheets.rowName.${variableName}` },
        unit: unit(region),
      })),
    },
  }
}
