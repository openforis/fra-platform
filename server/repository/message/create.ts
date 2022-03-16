import { BaseProtocol, DB } from '@server/db'
import { Objects } from '@core/utils'
import { Message } from '@meta/messageCenter'
import { User } from '@meta/user'

export const create = async (
  props: { message: string; topicId: number; user: User },
  client: BaseProtocol = DB
): Promise<Message> => {
  const { message, topicId, user } = props

  return client.one<Message>(
    `
        insert into public.message (message, topic_id, user_id)
        values ($1, $2, $3)
        returning *;
    `,
    [message, topicId, user.id],
    Objects.camelize
  )
}
