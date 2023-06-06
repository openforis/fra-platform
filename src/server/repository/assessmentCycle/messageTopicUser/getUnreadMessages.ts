import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const getUnreadMessages = async (
  props: { countryIso: CountryIso; assessment: Assessment; cycle: Cycle; key: string; user: User },
  client: BaseProtocol = DB
): Promise<{ unreadMessages: number }> => {
  const { countryIso, assessment, cycle, key, user } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.one<{ unreadMessages: number }>(
    `
      with mtu as (
        select topic_id, last_open_time, country_iso 
        from ${cycleSchema}.message_topic_user mtu
        left join ${cycleSchema}.message_topic mt ON mtu.topic_id = mt.id
        where mt.country_iso = $1
          and mt.key = $2
          and mtu.user_id = $3
      )
      select count(*) as unread_messages
      from ${cycleSchema}.message m
        left join ${cycleSchema}.message_topic mt ON m.topic_id = mt.id
        left join mtu on mtu.topic_id = mt.id
      where mt.country_iso = $1
        and mt.key = $2
        and m.user_id != $3
        and not m.deleted
        and (mtu.last_open_time is null or m.created_time > mtu.last_open_time);
    `,
    [countryIso, key, user.id],
    (row) => Objects.camelize(row)
  )
}
