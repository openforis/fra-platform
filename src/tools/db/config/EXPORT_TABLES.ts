import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { ExportTableProps } from 'tools/db/service/exportTables'

import { Schemas } from 'server/db/schemas'

export type ExportTableConfig = ExportTableProps & {
  skipExport?: boolean
}

export const EXPORT_ASSESSMENTS_CYCLES: { [key in AssessmentNames]?: Array<CycleName> } = {
  [AssessmentNames.fra]: ['2020', '2025' /* 'latest' */],
  [AssessmentNames.panEuropean]: ['2020' /* '2025' */],
}

export const EXPORT_ASSESSMENTS = Object.keys(EXPORT_ASSESSMENTS_CYCLES) as Array<AssessmentNames>

// Tables ordered by foreign key dependencies
const EXPORT_ASSESSMENT_TABLES = ['section', 'table_section', 'table', 'row', 'col']

const ASSESSMENT_TABLES = EXPORT_ASSESSMENTS.flatMap((assessmentName) =>
  EXPORT_ASSESSMENT_TABLES.flatMap((tableName) => ({
    schema: Schemas.getSchemaAssessment({ assessmentName }),
    table: tableName,
  }))
)

const EXPORT_ASSESSMENT_CYCLE_TABLES = [
  'country',
  'country_region',

  'region_group',
  // depends on above
  'region',

  // omitted:
  // 'link',
  // 'message',
  // 'message_topic',
  // 'message_topic_user',
  // 'repository',
  // 'descriptions',
  // 'node',
  // 'node_ext', (partly, see below)
  // 'node_values_estimation',
]

// cycle-specific tables (odp only for fra)
const _assessmentCycleTables: { [key in AssessmentNames]?: Array<string> } = {
  [AssessmentNames.fra]: ['original_data_point'],
}

const _orderBy: Record<string, string> = {
  country: 'country_iso',
  country_region: 'country_iso',
  region: 'region_code',
}

const ASSESSMENT_CYCLE_TABLES = EXPORT_ASSESSMENTS.flatMap((assessmentName) =>
  EXPORT_ASSESSMENTS_CYCLES[assessmentName].flatMap((cycleName) => {
    const allTables = [...EXPORT_ASSESSMENT_CYCLE_TABLES, ...(_assessmentCycleTables[assessmentName] || [])]
    return allTables.map((tableName) => ({
      schema: Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName }),
      table: tableName,
      ...(tableName in _orderBy && { orderBy: _orderBy[tableName] }),
    }))
  })
)

export const EXPORT_TABLES: Array<ExportTableConfig> = [
  // ===== Schema: Public
  { schema: 'public', table: 'users', skipExport: true },
  { schema: 'public', table: 'users_auth_provider', skipExport: true },
  { schema: 'public', table: 'users_role', skipExport: true },

  { schema: 'public', table: 'assessment' },
  { schema: 'public', table: 'assessment_cycle', where: `props ->> 'status' = 'published'` },
  { schema: 'public', table: 'country', orderBy: 'country_iso' },
  { schema: 'public', table: 'region', orderBy: 'region_code' },

  // ===== Schema: Assessment
  ...ASSESSMENT_TABLES,

  // ===== Schema: Assessment cycle
  ...ASSESSMENT_CYCLE_TABLES,

  // ===== node (Atlantis extentOfForest only)
  ...EXPORT_ASSESSMENTS.flatMap((assessmentName) =>
    EXPORT_ASSESSMENTS_CYCLES[assessmentName].flatMap((cycleName) => ({
      schema: Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName }),
      table: 'node',
      where: `country_iso like 'X%' and row_uuid in (
        select r.uuid from ${Schemas.getSchemaAssessment({ assessmentName })}.row r
        join ${Schemas.getSchemaAssessment({ assessmentName })}."table" t on t.uuid = r.table_uuid
        where t.props->>'name' = 'extentOfForest'
      )`,
    }))
  ),

  // ===== node_ext (totalLandArea only)
  ...EXPORT_ASSESSMENTS.flatMap((assessmentName) =>
    EXPORT_ASSESSMENTS_CYCLES[assessmentName].flatMap((cycleName) => ({
      schema: Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName }),
      table: 'node_ext',
      where: `type = 'node' and props->>'variableName' = 'totalLandArea'`,
    }))
  ),
]
