import { BaseProtocol, DB } from '@server/db'
import { MessageTopic } from '@meta/messageCenter'
import { MessageTopicRepository } from '@server/repository/messageTopic'
import { MessageRepository } from '@server/repository/message'

export const getTopic = async (
  props: {
    topicId: number
  },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { topicId } = props

  return client.tx(async (t) => {
    const messageTopic = await MessageTopicRepository.getOne({ topicId }, t)

    messageTopic.messages = await MessageRepository.getByTopic({ topicId }, t)

    return messageTopic
  })
}
