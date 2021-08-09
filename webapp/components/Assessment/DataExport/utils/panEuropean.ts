import { tableMappings } from '@webapp/components/Assessment/DataExport/utils/panEuropeanMappings'

export const getPanEuropeanTableMapping = (section: string): string =>
  tableMappings[section] ? `table_${tableMappings[section]}` : section
