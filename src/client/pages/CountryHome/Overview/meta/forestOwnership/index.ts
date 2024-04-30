import { Cycle, CycleName, Unit } from 'meta/assessment'
import { ChartColor } from 'meta/chart'
import { DashboardItemType } from 'meta/dashboard'
import { DashboardPieChart } from 'meta/dashboard/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

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

export const forestOwnership = (cycle: Cycle): DashboardPieChart => {
  const columnName = cols[cycle.name][0]
  const variables = variableNames.filter(({ cycleName }) => !cycleName || cycleName === cycle.name)

  const rowMetadata: RowsMetadata = variables.map(({ variableName }) => ({
    id: 1,
    variableName,
    label: `statisticalFactsheets.rowName.${variableName}`,
    calculateFn: `${tableName}.${variableName}`,
    calculationDependencies: [{ tableName, variableName }],
  }))

  return {
    type: DashboardItemType.pieChart,
    title: { key: 'statisticalFactsheets.forestOwnership.title', params: { year: columnName } },
    table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata, tableName }),
    chart: {
      cells: variables.map(({ variableName, color }) => ({
        variableName,
        color,
        columnName,
        label: { key: `statisticalFactsheets.rowName.${variableName}` },
        unit: `unit.${Unit.haThousand}`,
      })),
    },
  }
}
