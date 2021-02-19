import { tableMappings } from '@webapp/app/dataExport/utils/panEuropeanMappings'

export const getPanEuropeanTableMapping = (section: any) =>
  tableMappings[section] ? `table_${tableMappings[section]}` : section
