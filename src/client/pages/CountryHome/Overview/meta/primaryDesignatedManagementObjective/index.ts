// Forest growing stock and carbon
import { Cycle } from 'meta/assessment'
import { DashboardItemType, DashboardTable } from 'meta/dashboard'

import { getTable } from 'client/pages/CountryHome/Overview/meta/utils'
import { RowsMetadata } from 'client/pages/CountryHome/Overview/meta/utils/rowsMetadata'

const cols: Record<string, Array<string>> = {
  '2020': ['1990', '2000', '2010', '2020'],
  '2025': ['1990', '2000', '2010', '2020', '2025'],
}

// Production (1000 ha)	-	-	-	-
// Multiple use (1000 ha)	-	-	-	-
// Conservation of biodiversity (1000 ha)	1 235.20	2 223.11	3 001.51	2 830.66
// Protection of soil and water (1000 ha)	-	-	-	-
// Social Services (1000 ha)	400.09	605.99	599.51	529.76
// Other (1000 ha)
const variables = [
  'production',
  'multiple_use',
  'conservation_of_biodiversity',
  'protection_of_soil_and_water',
  'social_services',
  'other',
]

const tableName = 'primaryDesignatedManagementObjective'
const tableId = 2

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
