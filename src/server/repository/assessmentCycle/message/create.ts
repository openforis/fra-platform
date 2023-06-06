import { Objects } from 'utils/objects'

import { Assessment, Cycle } from 'meta/assessment'
import { Message, MessageTopic } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB, Schemas } from 'server/db'

export const create = async (
  props: { assessment: Assessment; cycle: Cycle; message: string; topic: MessageTopic; user: User },
  client: BaseProtocol = DB
): Promise<Message> => {
  const { assessment, cycle, message, topic, user } = props
  const schemaCycle = Schemas.getNameCycle(assessment, cycle)

  const { id } = await client.one<{ id: number }>(
    `
        insert into ${schemaCycle}.message (message, topic_id, user_id)
        values ($1, $2, $3)
        returning id
    `,
    [message, topic.id, user.id]
  )

  return client.one<Message>(
    `
        select m.*,
               to_jsonb(u.*) - 'profile_picture_file' - 'profile_picture_filename' as user
        from ${schemaCycle}.message m
                 left join public.users u
                           on m.user_id = u.id
        where m.id = $1
    `,
    [id],
    Objects.camelize
  )
}
