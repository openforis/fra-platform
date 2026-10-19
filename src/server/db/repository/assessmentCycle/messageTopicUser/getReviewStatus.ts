import { CountryIso } from 'meta/area/countryIso'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { ReviewStatus } from 'meta/assessment/review'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const getReviewStatus = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; sectionName: string; user: User },
  client: BaseProtocol = DB
): Promise<Array<ReviewStatus>> => {
  const { assessment, countryIso, cycle, sectionName, user } = props

  const schemaName = Schemas.getName(assessment)
  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.map<ReviewStatus>(
    `
        with m as (select topic_uuid,
                          count(*)          messages_count,
                          max(created_time) last_message_time
                   from ${cycleSchema}.message m
                            left join ${cycleSchema}.message_topic mt
                                      on mt.uuid = m.topic_uuid
                   where not m.deleted
                     and mt.section_uuid::text in (select uuid::text from ${schemaName}.section where props ->> 'name' = $4)
                   group by topic_uuid)
        select mt.key,
               mt.status,
               m.messages_count,
               msg.user_id                                                            last_message_user_id,
               mtu.last_open_time is null or m.last_message_time > mtu.last_open_time has_unread_messages
        from m
                 left join ${cycleSchema}.message msg
                           on m.last_message_time = msg.created_time
                 left join ${cycleSchema}.message_topic_user mtu
                           on mtu.topic_uuid = m.topic_uuid
                               and mtu.user_id = $2
                 left join ${cycleSchema}.message_topic mt
                           on mt.uuid = m.topic_uuid
        where mt.country_iso = $3
    `,
    [sectionName, user.id, countryIso, sectionName],
    (row) => Objects.camelize(row)
  )
}
