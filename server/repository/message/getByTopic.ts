import { BaseProtocol, DB } from '@server/db'
import { Message } from '@meta/messageCenter'

export const getByTopic = async (
  props: {
    topicId: number
  },
  client: BaseProtocol = DB
): Promise<Array<Message>> => {
  const { topicId } = props

  return client.many<Message>(`select * from public.message where topic_id = $1`, [topicId])
}
