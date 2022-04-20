import { Objects } from '@core/utils'

import { Assessment, Cycle } from '@meta/assessment'
import { Message, MessageTopic } from '@meta/messageCenter'
import { User } from '@meta/user'

import { BaseProtocol, DB, Schemas } from '@server/db'

export const create = async (
  props: { assessment: Assessment; cycle: Cycle; message: string; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<Message> => {
  const { assessment, cycle, message, topic, user } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  return client.one<Message>(
    `
        insert into ${schemaCycle}.message (message, topic_id, user_id)
        values ($1, $2, $3)
        returning *;
    `,
    [message, topic.id, user.id],
    Objects.camelize
  )
}
