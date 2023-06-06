import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const getOneOrNone = async (
  props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<{ lastOpenTime: string } | null> => {
  const { assessment, cycle, topic, user } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<{ lastOpenTime: string } | null>(
    `
      select last_open_time from ${cycleSchema}.message_topic_user
      where topic_id = $1 and user_id = $2
    `,
    [topic.id, user.id],
    Objects.camelize
  )
}
