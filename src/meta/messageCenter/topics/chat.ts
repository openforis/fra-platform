import { MessageTopic, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { User } from 'meta/user'

export const getChatRecipientId = (topic: MessageTopic, sender: User): number | undefined => {
  if (topic.type !== MessageTopicType.chat) return undefined

  const keys = topic.key.split('_')
  const userIds = [Number(keys.pop()), Number(keys.pop())]
  return userIds.find((userId) => userId !== Number(sender.id))
}
