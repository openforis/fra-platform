import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Message } from 'meta/messageCenter/message'
import { MessageTopic } from 'meta/messageCenter/messageTopic'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

import { BaseProtocol, DB } from 'server/db/db'
import { Schemas } from 'server/db/schemas'

export const create = async (
  props: { assessment: Assessment; cycle: Cycle; message: string; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<Message> => {
  const { assessment, cycle, message, topic, user } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const { id } = await client.one<{ id: number }>(
    `
        insert into ${schemaCycle}.message (message, topic_uuid, user_id)
        values ($1, $2, $3)
        returning id
    `,
    [message, topic.uuid, user.id]
  )

  return client.one<Message>(
    `
        select m.*,
               to_jsonb(u.*) as user
        from ${schemaCycle}.message m
                 left join public.users u
                           on m.user_id = u.id
        where m.id = $1
    `,
    [id],
    Objects.camelize
  )
}
