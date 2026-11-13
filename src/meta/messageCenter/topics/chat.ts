import { MessageTopic, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { getMessageBoardCountryKey } from 'meta/messageCenter/topics/messageBoard'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

const getChatKeyPrefix = (): string => `${getMessageBoardCountryKey()}_chat_`

const chatUserIdsRegExp = /^([1-9]\d*)_([1-9]\d*)$/

export const getChatRecipientId = (topic: MessageTopic, sender: User): number | undefined => {
  if (topic.type !== MessageTopicType.chat) return undefined

  const keys = topic.key.split('_')
  const userIds = [Number(keys.pop()), Number(keys.pop())]
  return userIds.find((userId) => userId !== Number(sender.id))
}

export const isChatKey = (key: string): boolean => key.startsWith(getChatKeyPrefix())

export const getChatUserIds = (key: string): Array<number> => {
  if (!isChatKey(key)) return []

  const match = key.slice(getChatKeyPrefix().length).match(chatUserIdsRegExp)
  if (Objects.isEmpty(match)) return []

  const [, userIdA, userIdB] = match
  const isSameUser = userIdA === userIdB
  if (isSameUser) return []

  return [Number(userIdA), Number(userIdB)]
}
