import { AssessmentController } from 'server/controller/assessment'
import { BaseProtocol, Schemas } from 'server/db'

export default async (client: BaseProtocol) => {
  const { assessment, cycle } = await AssessmentController.getOneWithCycle(
    { assessmentName: 'fra', cycleName: '2025' },
    client
  )

  const schemaName = Schemas.getName(assessment)
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)
  const schemaCycle2020 = 'assessment_fra_2020'

  const queryDoesMonitor = `
        -- 2020
        with values_2020 as (select country_iso, value
                             from ${schemaName}.table t
                                      left join ${schemaName}.row r on r.table_id = t.id
                                      left join ${schemaName}.col c on r.id = c.row_id
                                      left join ${schemaCycle2020}.node n on n.row_uuid = r.uuid and n.col_uuid = c.uuid
                             where t.props ->> 'name' = 'degradedForest'
                               and r.props ->> 'variableName' = 'does_country_monitor'
                               and c.props ->> 'colType' != 'header'),
             -- 2025
             target as (select r.uuid as row_uuid, c.uuid as col_uuid
                        from ${schemaName}.table t
                                 left join ${schemaName}.row r on r.table_id = t.id
                                 left join ${schemaName}.col c on r.id = c.row_id
                        where t.props ->> 'name' = 'degradedForestMonitoring2025'
                          and r.props ->> 'variableName' = 'doesYourCountryMonitor'
                          and c.props ->> 'colType' != 'header')
        insert into ${schemaCycle}.node (row_uuid, col_uuid, value, country_iso)
        select row_uuid, col_uuid, value, country_iso from values_2020 v cross join target on conflict do nothing
        `

  const queryNationalDefinition = `
          -- 2020
          with values_2020 as (select country_iso, value
                               from ${schemaName}.table t
                                        left join ${schemaName}.row r on r.table_id = t.id
                                        left join ${schemaName}.col c on r.id = c.row_id
                                        left join ${schemaCycle2020}.node n on n.row_uuid = r.uuid and n.col_uuid = c.uuid
                               where t.props ->> 'name' = 'degradedForest'
                                 and r.props ->> 'variableName' = 'national_definition'
                                 and c.props ->> 'colType' != 'header' and country_iso is not null),
               target as (select r.uuid as row_uuid, c.uuid as col_uuid
                          from ${schemaName}.table t
                                   left join ${schemaName}.row r on r.table_id = t.id
                                   left join ${schemaName}.col c on r.id = c.row_id
                          where t.props ->> 'name' = 'degradedForest2025'
                            and r.props ->> 'variableName' = 'national_definition'
                            and c.props ->> 'colType' not in ('header', 'placeholder'))
          insert into ${schemaCycle}.node (row_uuid, col_uuid, value, country_iso)
          select row_uuid, col_uuid, value, country_iso from values_2020 v cross join target on conflict do nothing
`

  await client.query(queryDoesMonitor)
  await client.query(queryNationalDefinition)
}
