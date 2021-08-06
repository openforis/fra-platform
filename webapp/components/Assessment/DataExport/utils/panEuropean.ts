import { tableMappings } from '@webapp/components/Assessment/DataExport/utils/panEuropeanMappings'

export const getPanEuropeanTableMapping = (section: any) =>
  tableMappings[section] ? `table_${tableMappings[section]}` : section
