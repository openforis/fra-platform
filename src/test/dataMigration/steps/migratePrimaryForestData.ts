import { Assessment } from 'meta/assessment'

import { BaseProtocol, Schemas } from 'server/db'

type Props = {
  assessment: Assessment
}

export const migratePrimaryForestData = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle2020 = assessment.cycles.find((c) => c.name === '2020')
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle2020 = Schemas.getNameCycle(assessment, cycle2020)
  const schemaCycle2025 = Schemas.getNameCycle(assessment, cycle2025)

  await client.query(`
      delete
      from ${schemaCycle2025}.node n
      where n.id in (select n.id
                     from ${schemaCycle2025}.node n
                              left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                              left join ${schemaAssessment}.row r on r.id = c.row_id
                              left join ${schemaAssessment}."table" t on t.id = r.table_id
                     where r.props ->> 'variableName' = 'totalPrimaryForest'
                       and t.props ->> 'name' = 'primaryForestByClimaticDomain')
      ;

      insert into ${schemaCycle2025}.node (country_iso, row_uuid, col_uuid, value)
      select n.country_iso,
             r2.uuid,
             c2.uuid,
             n.value
      from ${schemaCycle2020}.node n
               left join ${schemaAssessment}.row r on n.row_uuid = r.uuid
               left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
               left join ${schemaAssessment}."table" t on t.id = r.table_id
               left join ${schemaAssessment}.row r2 on r2.props ->> 'variableName' = 'primaryForest'
               left join ${schemaAssessment}.col c2
                         on c2.props ->> 'colName' = c.props ->> 'colName' and c2.row_id = r2.id
      where t.props ->> 'name' = 'specificForestCategories'
        and r.props ->> 'variableName' = 'primary_forest'
      order by 4, 3
      ;

      insert into ${schemaCycle2025}.node (country_iso, row_uuid, col_uuid, value)
      select n.country_iso,
             r2.uuid,
             c2.uuid,
             n.value
      from ${schemaCycle2020}.node n
               left join ${schemaAssessment}.row r on n.row_uuid = r.uuid
               left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
               left join ${schemaAssessment}."table" t on t.id = r.table_id
               left join ${schemaAssessment}.row r2 on r2.props ->> 'variableName' = 'totalPrimaryForest'
               left join ${schemaAssessment}.col c2
                         on c2.props ->> 'colName' = c.props ->> 'colName' and c2.row_id = r2.id
      where t.props ->> 'name' = 'specificForestCategories'
        and r.props ->> 'variableName' = 'primary_forest'
      order by 4, 3
      ;

      insert into ${schemaCycle2025}.node (country_iso, row_uuid, col_uuid, value)
      with source as
               (select n.country_iso,
                       r.props ->> 'variableName' as variable_name,
                       c.props ->> 'colName'      as col_name,
                       n.value,
                       row_number() over (
                           partition by n.country_iso
                           order by n.country_iso, c.props ->> 'colName'
                           )                      as row_number
                from ${schemaCycle2025}.node n
                         left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                         left join ${schemaAssessment}.row r on r.id = c.row_id
                         left join ${schemaAssessment}."table" t on t.id = r.table_id
                where t.props ->> 'name' = 'climaticDomain'
                  and n.value ->> 'raw' like '100%'),
           forest_characteristics as
               (select n.country_iso,
                       r.props ->> 'variableName' as variable_name,
                       c.props ->> 'colName'      as col_name,
                       r.uuid,
                       c.uuid,
                       n.value
                from ${schemaCycle2025}.node n
                         left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                         left join ${schemaAssessment}.row r on r.id = c.row_id
                         left join ${schemaAssessment}."table" t on t.id = r.table_id
                where t.props ->> 'name' = 'forestCharacteristics'
                  and r.props ->> 'variableName' = 'primaryForest'
                order by 1, 2, 3),
           primary_forest as
               (select r.props ->> 'variableName' as variable_name,
                       case
                           when r.props ->> 'variableName' = 'primaryForestBoreal' then 'boreal'
                           when r.props ->> 'variableName' = 'primaryForestSubTropical' then 'sub_tropical'
                           when r.props ->> 'variableName' = 'primaryForestTemperate' then 'temperate'
                           when r.props ->> 'variableName' = 'primaryForestTropical' then 'tropical'
                           end                    as variable_alias,
                       c.props ->> 'colName'      as col_name,
                       r.uuid                     as row_uuid,
                       c.uuid                     as col_uuid
                from ${schemaAssessment}.col c
                         left join ${schemaAssessment}.row r on r.id = c.row_id
                         left join ${schemaAssessment}."table" t on t.id = r.table_id
                where t.props ->> 'name' = 'primaryForestByClimaticDomain'
                  and r.props ->> 'variableName' != 'totalPrimaryForest'
                  and c.props ->> 'colName' is not null
                order by 1, 2, 3)
      select s.country_iso,
--        s.variable_name,
--        p.variable_name,
--        p.col_name,
             p.row_uuid,
             p.col_uuid,
             f.value
      from source s
               left join primary_forest p
                         on s.variable_name = p.variable_alias
               left join forest_characteristics f
                         on f.country_iso = s.country_iso
                             and f.col_name = p.col_name
      where s.row_number = 1
        and f.value is not null
--   and s.country_iso = 'VEN'
      order by s.country_iso, s.variable_name, p.variable_name, p.col_name

  `)
}
