import { Objects } from '@core/utils'

import { CountryIso } from '@meta/area'
import { Assessment, Cycle, ReviewStatus } from '@meta/assessment'
import { User } from '@meta/user'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const getReviewStatus = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; user: User },
  client: BaseProtocol = DB
): Promise<Array<ReviewStatus>> => {
  const { countryIso, assessment, cycle, user } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.map<ReviewStatus>(
    `
      with m as (
        select
          topic_id,
          count(*) messages_count,
          max(created_time) last_message_time
        from assessment_fra_2020.message m
        group by topic_id
      )
      select
        mt.key,
        mt.status,
        m.messages_count,
        m.last_message_time,
        msg.user_id last_message_user_id,
        mtu.last_open_time
      from m
        left join ${cycleSchema}.message msg
          on m.last_message_time = msg.created_time
        left join ${cycleSchema}.message_topic_user mtu
          on mtu.topic_id = m.topic_id
          and mtu.user_id = $1
        left join ${cycleSchema}.message_topic mt
          on mt.id = m.topic_id
      where mt.country_iso = $2
    `,
    [user?.id || 0, countryIso],
    (row) => Objects.camelize(row)
  )
}
