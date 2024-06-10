import { Promises } from 'utils/promises'

import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

/**
 * 1a. Insert value_aggregate into node_ext for fra 2020 where values don't exist in `node`
 * 1b. Insert value_aggregate.totalLandArea into node_ext for fra 2025 and 2020
 * 2. Drop value_aggregate
 * Note: We don't migrate values that are not associated with a table,
 *       eg. precalculated ratios or sums or totals
 * Note: We don't migrate values that are already in node_ext
 * Note: We don't migrate forestArea, even when not found in node as we have 100% data for countries for forestArea in either node or ODP tables
 */

const _migrateTotalLandArea = (schemaCycle: string) => `
    insert into ${schemaCycle}.node_ext (country_iso, type, props, value)
    select va.country_iso
         , 'node' as type
         , jsonb_build_object(
            'colName', va.col_name,
            'tableName', 'extentOfForest',
            'variableName', va.variable_name
           )      as props
         , va.value
    from ${schemaCycle}.value_aggregate va
    where va.variable_name = 'totalLandArea'
      and not exists (select 1
                      from ${schemaCycle}.node_ext ne
                      where ne.props ->> 'variableName' = va.variable_name
                    and ne.country_iso = va.country_iso
                    and ne.props ->> 'colName' = va.col_name)
    order by 1, 2, 3, 4;
`

const _migratePrimaryDesignatedManagementObjective = (schemaCycle: string, schemaAssessment: string) => `
    insert into ${schemaCycle}.node_ext (country_iso, type, props, value)
    with country_nodes as (select n.country_iso
                                , r.props ->> 'variableName'    as variable_name
                                , t.props ->> 'name'    as table_name
                                , c.props ->> 'colName'         as col_name
                                , n.value
                           from ${schemaCycle}.node n
                                    left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                                    left join ${schemaAssessment}.row r on r.id = c.row_id
                                    left join ${schemaAssessment}."table" t on t.id = r.table_id
                           where t.props ->> 'name' = 'primaryDesignatedManagementObjective')
    select va.country_iso
         , 'node' as type
         , jsonb_build_object(
            'colName', va.col_name,
            'variableName', va.variable_name,
            'tableName', n.table_name
           )      as props
         , va.value || '{"faoEstimate": "true"}' as value
    from ${schemaCycle}.value_aggregate va
             left join country_nodes n using (country_iso, variable_name, col_name)
    where va.value ->> 'raw' is not null
      and va.variable_name in ('conservation_of_biodiversity', 'multiple_use', 'no_unknown', 'other', 'production',
                               'protection_of_soil_and_water', 'social_services', 'totalForestArea')
      and (n.value is null or (n.value ->> 'raw' is null and va.value ->> 'raw' is not null))
    order by 1, 2, 3, 4;
`

const _migrateForestCharacteristics = (schemaCycle: string, schemaAssessment: string) => `
   insert into ${schemaCycle}.node_ext (country_iso, type, props, value)
   with country_nodes as (select n.country_iso
                               , r.props ->> 'variableName'    as variable_name
      , t.props ->> 'name'    as table_name
      , c.props ->> 'colName'         as col_name
      , n.value                       as value
   from ${schemaCycle}.node n
       left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
       left join ${schemaAssessment}.row r on r.id = c.row_id
       left join ${schemaAssessment}."table" t on t.id = r.table_id
   where t.props ->> 'name' = 'forestCharacteristics')
   select va.country_iso
        , 'node' as type
        , jsonb_build_object(
           'colName', va.col_name,
           'variableName', va.variable_name,
           'tableName', 'forestCharacteristics'
          )      as props
        , va.value || '{"faoEstimate": "true"}' as value
   from ${schemaCycle}.value_aggregate va
       left join country_nodes n using (country_iso, variable_name, col_name)
   where va.value ->> 'raw' is not null
     and va.variable_name in ('naturalForestArea', 'plantedForest')
     and (n.value is null or (n.value ->> 'raw' is null and va.value ->> 'raw' is not null))
   order by 1, 2, 3, 4;

`

const _migrateRest = (schemaCycle: string, schemaAssessment: string) => `
    insert into ${schemaCycle}.node_ext (country_iso, type, props, value)
    with country_nodes as (select n.country_iso
                                , r.props ->> 'variableName'    as variable_name
       , t.props ->> 'name'    as table_name
       , c.props ->> 'colName'         as col_name
       , n.value || '{"type": "node"}' as value
    from ${schemaCycle}.node n
        left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
        left join ${schemaAssessment}.row r on r.id = c.row_id
        left join ${schemaAssessment}."table" t on t.id = r.table_id
    where t.props ->> 'name' not in ('primaryDesignatedManagementObjective', 'forestCharacteristics'))
    select va.country_iso
         , 'node' as type
         , jsonb_build_object(
            'colName', va.col_name,
            'variableName', va.variable_name,
            'tableName',
            case
                when n.table_name is null and va.variable_name ilike '%ownership%'
                        then 'forestOwnership'
                 else n.table_name end
           )      as props
         , va.value || '{"faoEstimate": "true"}' as value
    from ${schemaCycle}.value_aggregate va
        left join country_nodes n using (country_iso, variable_name, col_name)
    where va.value ->> 'raw' is not null
      and va.variable_name not in (
        'conservation_of_biodiversity', 'multiple_use', 'no_unknown', 'other', 'production',
        'protection_of_soil_and_water', 'social_services', 'totalForestArea',
        'carbon_stock_biomass_total', 'carbon_stock_total', 'growing_stock_total', 'primary_forest_ratio', 'forest_area_percent', 'naturalForestArea', 'plantedForest', 'forestArea')
      and (n.value is null or (n.value ->> 'raw' is null and va.value ->> 'raw' is not null))
    order by 1, 2, 3, 4;
`

export default async (client: BaseProtocol) => {
  const assessment = await AssessmentController.getOne({ assessmentName: 'fra' }, client)
  await Promises.each(assessment.cycles, async (cycle) => {
    const schemaName = Schemas.getName(assessment)
    const schemaCycle = Schemas.getNameCycle(assessment, cycle)

    await client.query(_migrateTotalLandArea(schemaCycle))

    const cycleName = cycle.name

    if (cycleName === '2020') {
      await client.query(_migratePrimaryDesignatedManagementObjective(schemaCycle, schemaName))
      await client.query(_migrateForestCharacteristics(schemaCycle, schemaName))
      await client.query(_migrateRest(schemaCycle, schemaName))
    }
  })
}
