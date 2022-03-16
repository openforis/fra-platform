import { BaseProtocol, DB } from '@server/db'
import { MessageTopic } from '@meta/messageCenter'
import { Objects } from '@core/utils'

export const getOne = async (props: { topicId: number }, client: BaseProtocol = DB): Promise<MessageTopic> => {
  const { topicId } = props

  return client.oneOrNone<MessageTopic>(`select * from public.message_topic where id = $1`, [topicId], Objects.camelize)
}
