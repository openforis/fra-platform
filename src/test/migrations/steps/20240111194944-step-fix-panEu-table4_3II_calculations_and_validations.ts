import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { AssessmentNames, ColType } from 'meta/assessment'
import { NodeUpdate } from 'meta/data'

import { AssessmentController } from 'server/controller/assessment'
import { MetadataController } from 'server/controller/metadata'
import { BaseProtocol, DB, Schemas } from 'server/db'
import { DataRepository } from 'server/repository/assessmentCycle/data'
import { DataRedisRepository } from 'server/repository/redis/data'

import { updateDependencies } from 'test/migrations/steps/utils/updateDependencies'

const assessmentName = AssessmentNames.panEuropean
// const cycleName = '2025'
const metaCache = true
const sectionName = `naturalness`
const sectionName2020 = `naturalnessBySubclasses`
const tableName = 'table_4_3b'
const tableName2020 = `${tableName}_2020`

const _fix2020 = async (client: BaseProtocol): Promise<void> => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName: '2020' },
    client
  )
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // -- 1. fix unique table name
  const res = await client.oneOrNone<{ id: number }>(`
      update ${schemaAssessment}."table" t
      set props = jsonb_set(t.props, '{name}', '"${tableName2020}"')
      from (select t2.id
            from ${schemaAssessment}."table" t2
                     left join ${schemaAssessment}.table_section ts on t2.table_section_id = ts.id
                     left join ${schemaAssessment}.section s on s.id = ts.section_id
            where s.props ->> 'name' = '${sectionName2020}'
              and t2.props ->> 'name' = '${tableName}') as src
      where t.id = src.id
      returning t.id;`)

  if (res) {
    // -- 2. fix unique row variable names
    await client.query(`
        update ${schemaAssessment}.row r
        set props = r.props || jsonb_build_object('variableName', src.variable_name)
        from (select r.id
                   , '_2020_' || (r.props ->> 'variableName') as variable_name
              from ${schemaAssessment}.row r
              where r.props ->> 'variableName' is not null
                and r.table_id = ${res.id}) as src
        where r.id = src.id
    `)

    // -- 3. generate table 2020 view and drop old view
    const table = await MetadataController.getTable({ assessment, cycle, tableName: tableName2020 }, client)
    await DataRepository.createOrReplaceTableDataView({ assessment, cycle, table })
    await DB.query(`drop view if exists ${schemaCycle}.${tableName}`)
  }
}

export default async (client: BaseProtocol) => {
  // **** fix 2020
  await _fix2020(client)

  // **** fetch assessment
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName, cycleName: '2025', metaCache },
    client
  )
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  // **** delete validation from 'native_species', 'introduced_species'
  await client.query(`
      update ${schemaAssessment}.col c
      set props = src.props
      from (select c.id                                        as col_id
                 , jsonb_delete_path(c.props, '{validateFns}') as props
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on r.id = c.row_id
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
                     left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
                     left join ${schemaAssessment}.section s on s.id = ts.section_id
            where s.props ->> 'name' = '${sectionName}'
              and t.props ->> 'name' = '${tableName}'
              and r.props ->> 'variableName' is not null
              and c.props ->> 'colName' in ('native_species', 'introduced_species')) as src
      where c.id = src.col_id
      ;
  `)

  // **** update native_species calculation
  await client.query(`
      update ${schemaAssessment}.col c
      set props =
              jsonb_delete_path(c.props, '{linkedNodes}') || jsonb_build_object('colType', '${ColType.calculated}' , 'calcOrder', 6) ||
              src.props
      from (select c.id as col_id
                 , jsonb_build_object(
                  'calculateFn',
                  jsonb_build_object(
                                  '${cycle.uuid}',
                                  '(table_4_3a.' || (r.props ->> 'variableName')::text ||
                                  '.plantations && table_4_3b.' ||
                                  (r.props ->> 'variableName')::text || '.introduced_species) ' ||
                                  '? (table_4_3a.' || (r.props ->> 'variableName')::text ||
                                  '.plantations - table_4_3b.' ||
                                  (r.props ->> 'variableName')::text ||
                                  '.introduced_species)' ||
                                  ' : null'
                  )
                   )    as props
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on r.id = c.row_id
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
                     left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
                     left join ${schemaAssessment}.section s on s.id = ts.section_id
            where s.props ->> 'name' = '${sectionName}'
              and t.props ->> 'name' = '${tableName}'
              and r.props ->> 'variableName' is not null
              and c.props ->> 'colName' in ('native_species')) as src
      where c.id = src.col_id
      ;
  `)

  // **** update semi natural validations
  await client.query(`
      update ${schemaAssessment}.col c
      set props = c.props || jsonb_build_object('validateFns', src.validations)
      from (select c.id as col_id
                 , jsonb_build_object(
                          '${cycle.uuid}',
                          jsonb_build_array(
                                  'validatorSumSubCategoriesNotEqualToParent(' ||
                                  'table_4_3a.' || (r.props ->> 'variableName')::text || '.semi_natural,' ||
                                  '''panEuropean.naturalness.forest'',' ||
                                  '''4.3I'',' ||
                                  '[table_4_3b.' || (r.props ->> 'variableName')::text || '.naturally_established, ' ||
                                  'table_4_3b.' || (r.props ->> 'variableName')::text ||
                                  '.naturalised_introduced_species, ' ||
                                  'table_4_3b.' || (r.props ->> 'variableName')::text ||
                                  '.established_by_planting_and_or_seeding, ' ||
                                  'table_4_3b.' || (r.props ->> 'variableName')::text || '.coppice, ' ||
                                  'table_4_3b.' || (r.props ->> 'variableName')::text || '.unknown_origin],' ||
                                  '[''panEuropean.naturalnessBySubclasses.semiNaturalSubclasses''],' ||
                                  '''{"year":"' || split_part(r.props ->> 'variableName', '_', 2) || '"}'',' ||
                                  '''panEuropean.naturalness.semi_natural''' ||
                                      ')'
                          )
                   )    as validations
            from ${schemaAssessment}.col c
                     left join ${schemaAssessment}.row r on r.id = c.row_id
                     left join ${schemaAssessment}."table" t on t.id = r.table_id
                     left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
                     left join ${schemaAssessment}.section s on s.id = ts.section_id
            where s.props ->> 'name' = 'naturalness'
              and t.props ->> 'name' = 'table_4_3b'
              and r.props ->> 'variableName' is not null
              and c.props ->> 'colName' in
                  ('naturally_established', 'naturalised_introduced_species', 'established_by_planting_and_or_seeding',
                   'coppice', 'unknown_origin')) as src
      where c.id = src.col_id
  `)

  // **** delete native species
  const countryISOs = await client.map<CountryIso>(
    `
        delete
        from ${schemaCycle}.node n
        where n.col_uuid in
              (select c.uuid as col_uuid
               from ${schemaAssessment}.col c
                        left join ${schemaAssessment}.row r on r.id = c.row_id
                        left join ${schemaAssessment}."table" t on t.id = r.table_id
                        left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
                        left join ${schemaAssessment}.section s on s.id = ts.section_id
               where s.props ->> 'name' = '${sectionName}'
                 and t.props ->> 'name' = '${tableName}'
                 and c.props ->> 'colName' in ('native_species'))
        returning n.country_iso
    `,
    [],
    // eslint-disable-next-line camelcase
    ({ country_iso }) => country_iso
  )
  await Promise.all(
    countryISOs.map((countryIso) =>
      DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true }, client)
    )
  )

  // **** delete introduced_species != forest_2005
  const countryISOs1 = await client.map<CountryIso>(
    `
        delete
        from ${schemaCycle}.node n
        where n.col_uuid in
              (select c.uuid as col_uuid
               from ${schemaAssessment}.col c
                        left join ${schemaAssessment}.row r on r.id = c.row_id
                        left join ${schemaAssessment}."table" t on t.id = r.table_id
                        left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
                        left join ${schemaAssessment}.section s on s.id = ts.section_id
               where s.props ->> 'name' = '${sectionName}'
                 and t.props ->> 'name' = '${tableName}'
                 and r.props ->> 'variableName' != 'forest_2005'
                 and c.props ->> 'colName' in ('introduced_species'))
        returning n.country_iso
    `,
    [],
    // eslint-disable-next-line camelcase
    ({ country_iso }) => country_iso
  )
  await Promise.all(
    countryISOs1.map((countryIso) =>
      DataRedisRepository.cacheCountryTable({ assessment, cycle, countryIso, tableName, force: true }, client)
    )
  )

  // **** update metacache
  await AssessmentController.generateMetaCache(client)

  // **** update metadata cache
  await AssessmentController.generateMetadataCache({ assessment }, client)

  const update = await AssessmentController.getOneWithCycle({ assessmentName, cycleName: '2025', metaCache }, client)

  // **** update calculated native_species & introduced_species
  const nodes = await client.map<NodeUpdate>(
    `select s.props ->> 'name'         as section_name
          , t.props ->> 'name'         as table_name
          , r.props ->> 'variableName' as variable_name
          , c.props ->> 'colName'      as col_name
     from ${schemaAssessment}.col c
              left join ${schemaAssessment}.row r on r.id = c.row_id
              left join ${schemaAssessment}."table" t on t.id = r.table_id
              left join ${schemaAssessment}.table_section ts on ts.id = t.table_section_id
              left join ${schemaAssessment}.section s on s.id = ts.section_id
     where s.props ->> 'name' = '${sectionName}'
       and t.props ->> 'name' = '${tableName}'
       and r.props ->> 'variableName' is not null
--        and c.props ->> 'colName' in ('native_species', 'introduced_species')
       and c.props ->> 'colName' in ('native_species','introduced_species')`,
    [],
    (res) => Objects.camelize(res)
  )

  await updateDependencies(
    { assessment: update.assessment, cycle: update.cycle, nodes, includeSourceNodes: true },
    client
  )
}
