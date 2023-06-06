import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const update = async (
  props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<{ lastOpenTime: string }> => {
  const { assessment, cycle, topic, user } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.one<{ lastOpenTime: string }>(
    `
      update ${cycleSchema}.message_topic_user
      set last_open_time = now()
      where topic_id = $1 and user_id = $2
      returning last_open_time;
    `,
    [topic.id, user.id],
    Objects.camelize
  )
}
