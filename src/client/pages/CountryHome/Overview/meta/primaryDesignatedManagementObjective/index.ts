import { Cycle } from 'meta/assessment'
import { DashboardItemType, DashboardTable } from 'meta/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

const cols: Record<string, Array<string>> = {
  '2020': ['1990', '2000', '2010', '2020'],
  '2025': ['1990', '2000', '2010', '2020', '2025'],
}

const variables = [
  'production',
  'multiple_use',
  'conservation_of_biodiversity',
  'protection_of_soil_and_water',
  'social_services',
  'other',
]

const tableName = 'primaryDesignatedManagementObjective'
const tableId = 7

const rowMetadata: RowsMetadata = variables.map((variableName, i) => ({
  id: i + 1,
  variableName,
  label: `statisticalFactsheets.primaryDesignatedManagementObjective.${variableName}`,
  calculateFn: `${tableName}.${variableName}`,
  calculationDependencies: [{ tableName, variableName }],
}))

export const primaryDesignatedManagementObjectiveDashboard = (cycle: Cycle): DashboardTable => ({
  type: DashboardItemType.table,
  title: { key: 'statisticalFactsheets.primaryDesignatedManagementObjective.title' },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata, tableName }),
})
