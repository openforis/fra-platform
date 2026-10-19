import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter/messageTopic'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const getOneOrNone = async (
  props: { assessment: Assessment; cycle: Cycle; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<{ lastOpenTime: string } | null> => {
  const { assessment, cycle, topic, user } = props

  const cycleSchema = Schemas.getNameCycle(assessment, cycle)

  return client.oneOrNone<{ lastOpenTime: string } | null>(
    `
      select last_open_time from ${cycleSchema}.message_topic_user
      where topic_uuid = $1 and user_id = $2
    `,
    [topic.uuid, user.id],
    Objects.camelize
  )
}
