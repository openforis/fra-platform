import { tableMappings } from '@webapp/app/dataExport/utils/panEuropeanMappings'

export const getPanEuropeanTableMapping = (section: any) =>
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  tableMappings[section] ? `table_${tableMappings[section]}` : section
