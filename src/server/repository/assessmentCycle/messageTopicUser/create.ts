import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const create = async (
  props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<{ lastOpenTime: string }> => {
  const { assessment, cycle, topic, user } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.one<{ lastOpenTime: string }>(
    `
      insert into ${cycleSchema}.message_topic_user (topic_id, user_id, last_open_time)
      values ($1, $2, now()) returning last_open_time;
    `,
    [topic.id, user.id],
    Objects.camelize
  )
}
