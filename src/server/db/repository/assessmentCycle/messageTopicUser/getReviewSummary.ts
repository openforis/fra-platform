import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ReviewSummary } from 'meta/assessment/review'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const getReviewSummary = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; user: User },
  client: BaseProtocol = DB
): Promise<Array<ReviewSummary>> => {
  const { assessment, countryIso, cycle, user } = props

  const schemaName = Schemas.getName(assessment)
  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.one<Array<ReviewSummary>>(
    `
        with r as (select r.uuid as row_uuid, s.uuid as sub_section_uuid, s.parent_uuid, s.uuid as section_uuid
                   from ${schemaName}.row r
                            left join ${schemaName}."table" t
                                      on t.uuid = r.table_uuid
                            left join ${schemaName}.table_section ts
                                      on ts.uuid = t.table_section_uuid
                            left join ${schemaName}.section s
                                      on s.uuid = ts.section_uuid
                   where r.props -> 'cycles' ? $1),
             m as (select r.row_uuid,
                          r.sub_section_uuid,
                          r.parent_uuid,
                          m.topic_uuid,
                          m.created_time                                                as last_message_created_time,
                          row_number() over (partition by r.row_uuid, r.sub_section_uuid) as row_number
                   from r
                            left join ${cycleSchema}.message_topic mt
                                      on r.section_uuid = mt.section_uuid
                            left join ${cycleSchema}.message m
                                      on m.topic_uuid = mt.uuid
                   where mt.status = 'opened'
                     and not m.deleted
                     and mt.country_iso = $3),
             summaries as (select m.sub_section_uuid,
                                  m.parent_uuid,
                                 'dataRow_' || m.row_uuid                                        as key,
                                  mt.status,
                                  m.last_message_created_time,
                                  u.last_open_time,
                                  u.last_open_time is null
                                      or
                                  m.last_message_created_time > u.last_open_time as has_unread_messages
                           from m
                                    left join ${cycleSchema}.message_topic_user u
                                              on u.topic_uuid = m.topic_uuid and u.user_id = $2
                                    left join ${cycleSchema}.message_topic mt
                                              on mt.uuid = m.topic_uuid
                           where m.row_number = 1)
        select jsonb_agg(s.*) as data
        from summaries s
    `,
    [cycle.uuid, user.id, countryIso],
    ({ data }) => (data ? Objects.camelize(data) : [])
  )
}
