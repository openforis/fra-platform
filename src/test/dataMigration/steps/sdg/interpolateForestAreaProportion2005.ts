import { Assessment } from '@meta/assessment'

import { BaseProtocol, Schemas } from '@server/db'

type Props = {
  assessment: Assessment
}

export const interpolateForestAreaProportion2005 = async (props: Props, client: BaseProtocol): Promise<void> => {
  const { assessment } = props
  const cycle2025 = assessment.cycles.find((c) => c.name === '2025')
  const schemaAssessment = Schemas.getName(assessment)
  const schemaCycle2025 = Schemas.getNameCycle(assessment, cycle2025)

  await client.query(`
  --- Interpolate values for year 2005
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
           paired_values as (select country_iso
                                  , row_uuid
                                  , col_uuid
                                  , col_name::numeric
                                  , value ->> 'raw' as                                                           value
                                  , lag(col_name::numeric) over (partition by country_iso order by col_name) as  prev_col
                                  , lag((value ->> 'raw')::numeric)
                                    over (partition by country_iso order by col_name) as                         prev_val
                                  , lead(col_name::numeric) over (partition by country_iso order by col_name) as next_col
                                  , lead((value ->> 'raw')::numeric)
                                    over (partition by country_iso order by col_name) as                         next_val
                             from base
                             order by country_iso, col_name)
      select country_iso,
             row_uuid,
             col_uuid,
             case
                 -- Interpolate between values or return existing value (2005)
                 when value is null and next_val is not null then
                     jsonb_build_object('raw', (prev_val + (next_val - prev_val) * (col_name - prev_col) / (next_col - prev_col))::text)
                 else jsonb_build_object('raw', value)
                 end as value
      from paired_values
      where col_name = '2005'
      on conflict (country_iso, row_uuid, col_uuid) do update
          set value = excluded.value;
  `)
}
