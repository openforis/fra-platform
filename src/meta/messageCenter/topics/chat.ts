import { MessageTopic, MessageTopicType } from 'meta/messageCenter/messageTopic'
import { getMessageBoardCountryKey } from 'meta/messageCenter/topics/messageBoard'
import { User } from 'meta/user/user'
import { Objects } from 'utils/objects'

const getChatKeyPrefix = (): string => `${getMessageBoardCountryKey()}_chat_`

// <user id>_<user id>, positive integers without leading zeros, how getMessageBoardChatKey writes them
const chatUserIdsRegExp = /^([1-9]\d*)_([1-9]\d*)$/

export const getChatRecipientId = (topic: MessageTopic, sender: User): number | undefined => {
  if (topic.type !== MessageTopicType.chat) return undefined

  const keys = topic.key.split('_')
  const userIds = [Number(keys.pop()), Number(keys.pop())]
  return userIds.find((userId) => userId !== Number(sender.id))
}

export const isChatKey = (key: string): boolean => key.startsWith(getChatKeyPrefix())

// The two user ids in a chat key, none when the key isn't a valid chat key
export const getChatUserIds = (key: string): Array<number> => {
  if (!isChatKey(key)) return []

  const match = key.slice(getChatKeyPrefix().length).match(chatUserIdsRegExp)
  if (Objects.isEmpty(match)) return []

  const [, userIdA, userIdB] = match
  const isSameUser = userIdA === userIdB
  if (isSameUser) return []

  return [Number(userIdA), Number(userIdB)]
}
