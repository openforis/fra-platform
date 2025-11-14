import { ExportTableProps } from './exportTable'

const schemaPublicTables = [
  { schema: 'public', table: 'assessment' },
  { schema: 'public', table: 'assessment_cycle' },
]

export const TABLES_TO_EXPORT: Array<ExportTableProps> = [...schemaPublicTables]
