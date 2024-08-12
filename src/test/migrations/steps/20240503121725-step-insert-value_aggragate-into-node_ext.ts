import { Promises } from 'utils/promises'

import { Assessment, AssessmentNames, Cycle } from 'meta/assessment'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, DB, Schemas } from 'server/db'

const client: BaseProtocol = DB

/**
 * 1a. Insert value_aggregate into node_ext for fra 2020
 * 1b. Insert value_aggregate.totalLandArea into node_ext for fra 2025 and 2020
 * 2. Drop value_aggregate
 * Note: We don't migrate values that are not associated with a table,
 *       eg. precalculated ratios or sums or totals
 * Note: We don't migrate values that are already in node_ext
 * Note: We don't migrate forestArea, even when not found in node as we have 100% data for countries for forestArea in either node or ODP tables
 */

const _case = (variable: string, table: string) => `when variable_name = '${variable}' then '${table}'`
const _cases = (variables: Array<string>, table: string) => {
  return variables.map((v) => _case(v, table)).join('\n')
}

const _migrateValueAggregate = async (assessment: Assessment, cycle: Cycle) => {
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const where = `variable_name not in ('forest_area_percent', 'primary_forest_ratio', 'totalLandArea')`
  const notExist = `select 1 from ${schemaCycle}.node_ext ne where ne.country_iso = value_aggregate.country_iso and ne.props ->> 'variableName' = value_aggregate.variable_name and ne.props ->> 'colName' = value_aggregate.col_name`
  await client.query(`
      insert into ${schemaCycle}.node_ext (country_iso, type, props, value)

      with value_aggregate as (
      select 
            country_iso,
            case when variable_name = 'growing_stock_total' then 'forest' else variable_name end as variable_name,
            case
              ${_case('forestArea', 'extentOfForest')}
              ${_case('forest_area_within_protected_areas', 'forestAreaWithinProtectedAreas')}
              ${_case('growing_stock_total', 'growingStockTotal')}
              ${_case('primary_forest', 'specificForestCategories')}
              ${_cases(['carbon_stock_biomass_total', 'carbon_stock_total'], 'carbonStock')}
              ${_cases(
                [
                  'conservation_of_biodiversity',
                  'multiple_use',
                  'other',
                  'production',
                  'protection_of_soil_and_water',
                  'social_services',
                ],
                'primaryDesignatedManagementObjective'
              )}
              ${_cases(['other_or_unknown', 'private_ownership', 'public_ownership'], 'forestOwnership')}
              ${_cases(['plantedForest', 'naturalForestArea'], 'forestCharacteristics')}
                else 'ERROR'
            end as table_name,
            col_name,
            value || '{"faoEstimate":true}'::jsonb as value
      from ${schemaCycle}.value_aggregate
      where ${where} and not exists (${notExist}))
      select va.country_iso
           , 'node' as type
           , jsonb_build_object(
              'colName', va.col_name,
              'variableName', va.variable_name,
              'tableName', va.table_name
             )      as props
           , va.value
      from value_aggregate va
            `)
}

const _deprecateValueAggregate = async (assessments: Array<Assessment>): Promise<void> => {
  await Promises.each(assessments, async (assessment) => {
    await Promises.each(assessment.cycles, async (cycle) => {
      const schemaCycle = Schemas.getNameCycle(assessment, cycle)
      const exists = await client.query(`select 1 from ${schemaCycle}.value_aggregate`)
      if (exists.length === 0) {
        // Drop if the table is empty
        await client.query(`drop table ${schemaCycle}.value_aggregate`)
      } else {
        // Move to legacy schema
        await client.query(`create schema if not exists _legacy_${schemaCycle}`)
        await client.query(`alter table ${schemaCycle}.value_aggregate set schema _legacy_${schemaCycle}`)
      }
    })
  })
}

export default async () => {
  const assessments = await AssessmentController.getAll({}, client)
  const assessmentFra = assessments.find((a) => a.props.name === AssessmentNames.fra)
  const cycle2020 = assessmentFra.cycles.find((c) => c.name === '2020')

  await _migrateValueAggregate(assessmentFra, cycle2020)
  await _deprecateValueAggregate(assessments)
}
