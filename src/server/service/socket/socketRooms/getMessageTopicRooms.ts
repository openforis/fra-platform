import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'

import { getUserRoom } from './_roomNames'
import { getCountryRooms } from './getCountryRooms'

type Props = {
  cycle: Cycle
  topic: MessageTopic
}

// A chat goes to its two users, any other topic to the users with a role in its country and cycle, and the admins
export const getMessageTopicRooms = (props: Props): Array<string> => {
  const { cycle, topic } = props
  const { countryIso, key } = topic

  // Decided by the key: topic.type comes from the request that created the topic
  if (Topics.isChatKey(key)) {
    return Topics.getChatUserIds(key).map<string>((userId) => getUserRoom(userId))
  }

  return getCountryRooms({ countryIso, cycle })
}
