import { tableMappings } from '@webapp/app/dataExport/utils/panEuropeanMappings'

export const getPanEuropeanTableMapping = (section) =>
  tableMappings[section] ? `table_${tableMappings[section]}` : section
