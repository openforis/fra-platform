import { CountryProps } from 'meta/area/country'
import { CountryIso } from 'meta/area/countryIso'
import { AssessmentNames } from 'meta/assessment/assessment'
import { CycleName } from 'meta/assessment/cycle'
import { ExportTableProps } from 'tools/db/service/exportTables'

import { Schemas } from 'server/db/schemas'

export type ExportTableConfig = ExportTableProps & {
  skipExport?: boolean
}

type CycleProps = {
  assessmentName: AssessmentNames
  cycleName: CycleName
}

export const EXPORT_ASSESSMENTS_CYCLES: { [key in AssessmentNames]?: Array<CycleName> } = {
  [AssessmentNames.fra]: ['2020', '2025', 'latest'],
  [AssessmentNames.panEuropean]: ['2020', '2025'],
}

export const EXPORT_ASSESSMENTS = Object.keys(EXPORT_ASSESSMENTS_CYCLES) as Array<AssessmentNames>

// Cycles that aren't public yet: report data is exported for these test countries only
const EXPORT_COUNTRIES: Record<CycleName, Array<CountryIso>> = {
  latest: ['X01'],
}

// Every country of a cycle that isn't public gets these props, without its status and dates
const EXPORT_COUNTRY_PROPS: Omit<CountryProps, 'status'> = {
  deskStudy: false,
  domain: 'tropical',
  forestCharacteristics: { useOriginalDataPoint: true },
}

// Filter for the assessment_cycle table: keep only the cycles listed in EXPORT_ASSESSMENTS_CYCLES
const ASSESSMENT_CYCLES_WHERE = EXPORT_ASSESSMENTS.map<string>((assessmentName) => {
  const cycleNames = EXPORT_ASSESSMENTS_CYCLES[assessmentName].map<string>((cycleName) => `'${cycleName}'`).join(', ')
  return `(
    assessment_uuid = (select uuid from public.assessment where props ->> 'name' = '${assessmentName}')
    and name in (${cycleNames})
  )`
}).join(' or ')

// Tables ordered by foreign key dependencies
const EXPORT_ASSESSMENT_TABLES = ['section', 'table_section', 'table', 'row', 'col']

const ASSESSMENT_TABLES = EXPORT_ASSESSMENTS.flatMap((assessmentName) =>
  EXPORT_ASSESSMENT_TABLES.flatMap((tableName) => ({
    schema: Schemas.getSchemaAssessment({ assessmentName }),
    table: tableName,
  }))
)

// The tables we export for a cycle, in the order they have to be imported
const _getCycleTables = (props: CycleProps): Array<ExportTableConfig> => {
  const { assessmentName, cycleName } = props
  const schema = Schemas.getSchemaAssessmentCycle({ assessmentName, cycleName })
  const schemaAssessment = Schemas.getSchemaAssessment({ assessmentName })

  // omitted:
  // 'link',
  // 'message',
  // 'message_topic',
  // 'message_topic_user',
  // 'repository',
  // 'descriptions',
  // 'node_values_estimation',
  const tables: Array<ExportTableConfig> = [
    { schema, table: 'country', orderBy: 'country_iso' },
    { schema, table: 'country_region', orderBy: 'country_iso' },
    { schema, table: 'region_group' },
    { schema, table: 'region', orderBy: 'region_code' },
  ]

  // odp only for fra
  if (assessmentName === AssessmentNames.fra) tables.push({ schema, table: 'original_data_point' })

  // node (Atlantis extentOfForest only)
  tables.push({
    schema,
    table: 'node',
    where: `country_iso like 'X%' and row_uuid in (
      select r.uuid from ${schemaAssessment}.row r
      join ${schemaAssessment}."table" t on t.uuid = r.table_uuid
      where t.props->>'name' = 'extentOfForest'
    )`,
  })

  // node_ext (totalLandArea only)
  tables.push({ schema, table: 'node_ext', where: `type = 'node' and props->>'variableName' = 'totalLandArea'` })

  return tables
}

// A cycle that isn't public yet exports the same tables, but without the country data
const _getPrivateCycleTables = (props: CycleProps): Array<ExportTableConfig> => {
  const { cycleName } = props
  const countryIsos = EXPORT_COUNTRIES[cycleName].map<string>((countryIso) => `'${countryIso}'`).join(', ')
  const countryWhere = `country_iso in (${countryIsos})`
  const countrySelect = `country_iso, '${JSON.stringify(EXPORT_COUNTRY_PROPS)}'::jsonb as props`
  const reportDataTables = ['original_data_point', 'node', 'node_ext']

  const tables = _getCycleTables(props)

  return tables.map<ExportTableConfig>((tableConfig) => {
    const { table, where } = tableConfig

    if (table === 'country') {
      return { ...tableConfig, select: countrySelect }
    }
    if (reportDataTables.includes(table)) {
      return { ...tableConfig, where: where ? `${countryWhere} and ${where}` : countryWhere }
    }
    return tableConfig
  })
}

const ASSESSMENT_CYCLE_TABLES = EXPORT_ASSESSMENTS.flatMap<ExportTableConfig>((assessmentName) =>
  EXPORT_ASSESSMENTS_CYCLES[assessmentName].flatMap<ExportTableConfig>((cycleName) => {
    const isPrivate = cycleName in EXPORT_COUNTRIES
    if (isPrivate) return _getPrivateCycleTables({ assessmentName, cycleName })
    return _getCycleTables({ assessmentName, cycleName })
  })
)

export const EXPORT_TABLES: Array<ExportTableConfig> = [
  // ===== Schema: Public
  { schema: 'public', table: 'users', skipExport: true },
  { schema: 'public', table: 'users_auth_provider', skipExport: true },
  { schema: 'public', table: 'users_role', skipExport: true },

  { schema: 'public', table: 'assessment' },
  { schema: 'public', table: 'assessment_cycle', where: ASSESSMENT_CYCLES_WHERE },
  { schema: 'public', table: 'country', orderBy: 'country_iso' },
  { schema: 'public', table: 'region', orderBy: 'region_code' },

  // ===== Schema: Assessment
  ...ASSESSMENT_TABLES,

  // ===== Schema: Assessment cycle
  ...ASSESSMENT_CYCLE_TABLES,
]
