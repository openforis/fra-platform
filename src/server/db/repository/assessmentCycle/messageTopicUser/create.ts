import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter/messageTopic'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const create = async (
  props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<{ lastOpenTime: string }> => {
  const { assessment, cycle, topic, user } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.one<{ lastOpenTime: string }>(
    `
      insert into ${cycleSchema}.message_topic_user (topic_uuid, user_id, last_open_time)
      values ($1, $2, now()) returning last_open_time;
    `,
    [topic.uuid, user.id],
    Objects.camelize
  )
}
