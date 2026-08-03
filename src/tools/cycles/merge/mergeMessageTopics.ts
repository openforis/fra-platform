import { PropsMerge } from 'tools/cycles/merge/_types'
import { getSchemas } from 'tools/cycles/merge/_utils'

import { BaseProtocol } from 'server/db/db'

export const mergeMessageTopics = async (props: PropsMerge, client: BaseProtocol): Promise<void> => {
  const { countryISOs } = props

  const { schemaCycleFrom, schemaCycleTo } = getSchemas(props)
  const params = { countryISOs }

  await client.query(
    `
        delete
        from ${schemaCycleTo}.message_topic
        where country_iso in ($(countryISOs:list));

        insert into ${schemaCycleTo}.message_topic (uuid, country_iso, "key", status, type, section_uuid)
        select f.uuid, f.country_iso, f."key", f.status, f.type, f.section_uuid
        from ${schemaCycleFrom}.message_topic f
        where f.country_iso in ($(countryISOs:list));

        insert into ${schemaCycleTo}.message (topic_uuid, user_id, message, deleted, created_time)
        select f.topic_uuid, f.user_id, f.message, f.deleted, f.created_time
        from ${schemaCycleFrom}.message f
                 left join ${schemaCycleFrom}.message_topic mt on f.topic_uuid = mt.uuid
        where mt.country_iso in ($(countryISOs:list));

        insert into ${schemaCycleTo}.message_topic_user (topic_uuid, user_id, last_open_time)
        select f.topic_uuid, f.user_id, f.last_open_time
        from ${schemaCycleFrom}.message_topic_user f
                 left join ${schemaCycleFrom}.message_topic mt on f.topic_uuid = mt.uuid
        where mt.country_iso in ($(countryISOs:list));
    `,
    params
  )
}
