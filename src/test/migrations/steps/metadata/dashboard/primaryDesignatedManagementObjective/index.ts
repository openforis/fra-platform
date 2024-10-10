import { Cycle } from 'meta/assessment'
import { DashboardItemType, DashboardTable } from 'meta/dashboard'

import { getTable, RowsMetadata } from '../utils'

const cols: Record<string, Array<string>> = {
  '2020': ['1990', '2000', '2010', '2020'],
  '2025': ['1990', '2000', '2010', '2020', '2025'],
}

const baseVariables = [
  'production',
  'multiple_use',
  'conservation_of_biodiversity',
  'protection_of_soil_and_water',
  'social_services',
  'other',
]

const variables: Record<string, Array<string>> = {
  '2020': baseVariables,
  '2025': [...baseVariables, 'no_designation', 'unknown'],
}

const tableName = 'primaryDesignatedManagementObjective'
const tableId = 7

const rowMetadata = (cycle: Cycle, region: boolean): RowsMetadata =>
  variables[cycle.name].map((variableName, i) => ({
    id: i + 1,
    variableName,
    label: {
      key: `statisticalFactsheets.primaryDesignatedManagementObjective.${variableName}`,
      params: {
        unit: 'unit.haThousand',
      },
    },
    calculateFn: `${tableName}.${variableName} ${region ? '/ 1000' : ''}`,
    calculationDependencies: [{ tableName, variableName }],
  }))

export const primaryDesignatedManagementObjectiveDashboard = (cycle: Cycle, region: boolean): DashboardTable => ({
  type: DashboardItemType.table,
  title: {
    key: 'statisticalFactsheets.primaryDesignatedManagementObjective.title',
    params: {
      startYear: cols[cycle.name].at(0),
      endYear: cols[cycle.name].at(-1),
      unit: 'unit.haThousand',
    },
  },
  table: getTable({ cycle, cols: cols[cycle.name], tableId, rowMetadata: rowMetadata(cycle, region), tableName }),
})
