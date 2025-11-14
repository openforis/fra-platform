import { ExportTableProps } from 'server/service/databaseService/export'

// const EXPORT_ASSESSMENTS = [AssessmentNames.fra, AssessmentNames.panEuropean]
// // Tables ordered by foreign key dependencies
// const EXPORT_ASSESSMENT_TABLES = ['section', 'table_section', 'table', 'row', 'col']
//
// const ASSESSMENT_TABLES = EXPORT_ASSESSMENTS.flatMap((assessmentName) =>
//   EXPORT_ASSESSMENT_TABLES.map((tableName) => ({
//     schema: Schemas.getName({ props: { name: assessmentName } }),
//     table: tableName,
//   }))
// )

export const EXPORT_TABLES: Array<ExportTableProps> = [
  // ===== Schema: Public
  { schema: 'public', table: 'assessment' },
  { schema: 'public', table: 'assessment_cycle' },
  // { schema: 'public', table: 'country' }, // omitted: import via public migration step
  { schema: 'public', table: 'region', orderBy: 'region_code' },

  // ===== Schema: Assessment
  // ...ASSESSMENT_TABLES,
]
