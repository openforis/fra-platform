import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, ReviewStatus } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getReviewStatus = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; section: string; user: User },
  client: BaseProtocol = DB
): Promise<Array<ReviewStatus>> => {
  const { countryIso, assessment, cycle, section, user } = props

  const schemaName = Schemas.getName(assessment)
  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.map<ReviewStatus>(
    `
      with m as (
        select
          topic_id,
          count(*) messages_count,
          max(created_time) last_message_time
        from ${cycleSchema}.message m
        left join ${cycleSchema}.message_topic mt
          on mt.id = m.topic_id
        where mt.key in (
          select r.uuid::text
          from ${schemaName}.row r
            left join ${schemaName}."table" t
              on t.id = r.table_id
            left join ${schemaName}.table_section ts
              on ts.id = t.table_section_id
            left join ${schemaName}.section as s
              on s.id = ts.section_id
          where s.props ->> 'name' = $1
        )
        group by topic_id
      )
      select
        mt.key,
        mt.status,
        m.messages_count,
        msg.user_id last_message_user_id,
        m.last_message_time > mtu.last_open_time has_unread_messages
      from m
        left join ${cycleSchema}.message msg
          on m.last_message_time = msg.created_time
        left join ${cycleSchema}.message_topic_user mtu
          on mtu.topic_id = m.topic_id
          and mtu.user_id = $2
        left join ${cycleSchema}.message_topic mt
          on mt.id = m.topic_id
      where mt.country_iso = $3
    `,
    [section, user.id, countryIso],
    (row) => Objects.camelize(row)
  )
}
