import { Assessment } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
}

export const extrapolateForestAreaProportion20212025 = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle2025 = Schemas.getNameCycle(assessment, cycle2025)

  await client.query(`
  --- Extrapolate values for years 2021 - 2025
      insert into ${schemaCycle2025}.node (country_iso, row_uuid, col_uuid, value)
      with base as (select n.country_iso,
                           r2.uuid                    as row_uuid,
                           c.uuid                     as col_uuid,
                           c.props ->> 'colName'      as col_name,
                           r.props ->> 'variableName' as variable_name,
                           n.value
                    from ${schemaCycle2025}.node n
                             left join ${schemaAssessment}.row r on n.row_uuid = r.uuid
                             left join ${schemaAssessment}.col c on n.col_uuid = c.uuid
                             left join ${schemaAssessment}."table" t on t.id = r.table_id
                             left join ${schemaAssessment}.row r2
                                       on r2.props ->> 'variableName' = 'forestAreaProportionLandArea2015'
                    where t.props ->> 'name' = 'sustainableDevelopment15_1_1'
                    order by 4, 5, 6),
               values_2015 as (         select country_iso, (value->>'raw')::numeric as val15 from base where col_name = '2015'     ),
               values_2020 as (         select country_iso, (value->>'raw')::numeric as val20 from base where col_name = '2020'     )
              select
                  country_iso
                  , row_uuid
                  , col_uuid
                  , jsonb_build_object('raw', (
                      least(100, greatest(0, val15 + (val20 - val15) * (col_name::numeric - 2015) / 5))
                      )::text) as value
              from base
                  join values_2015 v15 using (country_iso)
                  join values_2020 v20 using (country_iso)
              where base.col_name > '2020'
              order by country_iso, col_name
              on conflict (country_iso, row_uuid, col_uuid) do update
                  set value = excluded.value;
  `)
}
