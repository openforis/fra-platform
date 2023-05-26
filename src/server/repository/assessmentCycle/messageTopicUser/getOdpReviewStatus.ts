import { Objects } from '@utils/objects'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, ReviewStatus } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getOdpReviewStatus = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; odpId?: string; user: User },
  client: BaseProtocol = DB
): Promise<Array<ReviewStatus>> => {
  const { countryIso, assessment, cycle, odpId, user } = props

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
        where not m.deleted and mt.key like 'odp-$1:value-%'
        group by topic_id
      )
      select
        mt.key,
        mt.status,
        m.messages_count,
        msg.user_id last_message_user_id,
        mtu.last_open_time is null or m.last_message_time > mtu.last_open_time has_unread_messages
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
    [odpId, user.id, countryIso],
    (row) => Objects.camelize(row)
  )
}
