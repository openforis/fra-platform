import { ExportTableProps } from 'server/service/databaseService/export'

export const TABLES: Array<ExportTableProps> = [
  // assessment
  { schema: 'public', table: 'assessment' },
  { schema: 'public', table: 'assessment_cycle' },
  // areas
  // { schema: 'public', table: 'country' }, // omitted: import via public migration step
  { schema: 'public', table: 'region' },
]
