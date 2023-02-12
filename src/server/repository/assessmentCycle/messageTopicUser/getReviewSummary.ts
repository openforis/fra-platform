import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, ReviewSummary } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getReviewSummary = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; user: User },
  client: BaseProtocol = DB
): Promise<Array<ReviewSummary>> => {
  const { countryIso, assessment, cycle, user } = props

  const schemaName = Schemas.getName(assessment)
  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.one<Array<ReviewSummary>>(
    `
        with data_source_uuids as (select country_iso,
                                          section_name,
                                          jsonb_array_elements(value -> 'dataSources') ->> 'uuid' as uuid
                                   from ${cycleSchema}.descriptions d
                                   where d.value -> 'dataSources' is not null),
             data_source_rows as (select dsr.uuid::uuid as row_uuid,
                                         s.id           as sub_section_id,
                                         s.parent_id
                                  from data_source_uuids dsr
                                           left join ${schemaName}.section s on s.props ->> 'name' = dsr.section_name),
             r as (select r.uuid as row_uuid, s.id as sub_section_id, s.parent_id
                   from ${schemaName}.row r
                            left join ${schemaName}."table" t
                                      on t.id = r.table_id
                            left join ${schemaName}.table_section ts
                                      on ts.id = t.table_section_id
                            left join ${schemaName}.section s
                                      on s.id = ts.section_id
                   where r.props -> 'cycles' ? '5883400e-988d-45e5-9b65-fff6715c25b7'
                   union all
                   select *
                   from data_source_rows),
             m as (select r.row_uuid,
                          r.sub_section_id,
                          r.parent_id,
                          m.topic_id,
                          m.created_time                                                as last_message_created_time,
                          row_number() over (partition by r.row_uuid, r.sub_section_id) as row_number
                   from r
                            left join ${cycleSchema}.message_topic mt
                                      on r.row_uuid::varchar = mt.key
                            left join ${cycleSchema}.message m
                                      on m.topic_id = mt.id
                   where mt.status = 'opened'
                     and not m.deleted
                     and mt.country_iso = $3),
             summaries as (select m.sub_section_id,
                                  m.parent_id,
                                  m.row_uuid                                     as key,
                                  mt.status,
                                  m.last_message_created_time,
                                  u.last_open_time,
                                  u.last_open_time is null
                                      or
                                  m.last_message_created_time > u.last_open_time as has_unread_messages
                           from m
                                    left join ${cycleSchema}.message_topic_user u
                                              on u.topic_id = m.topic_id and u.user_id = $2
                                    left join ${cycleSchema}.message_topic mt
                                              on mt.id = m.topic_id
                           where m.row_number = 1)
        select jsonb_agg(s.*) as data
        from summaries s
    `,
    [cycle.uuid, user.id, countryIso],
    ({ data }) => (data ? Objects.camelize(data) : [])
  )
}
