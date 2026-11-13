import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter/messageTopic'
import { Topics } from 'meta/messageCenter/topics'

import { getUserRoom } from './_roomNames'
import { getCountryRooms } from './getCountryRooms'

type Props = {
  cycle: Cycle
  topic: MessageTopic
}

export const getMessageTopicRooms = (props: Props): Array<string> => {
  const { cycle, topic } = props
  const { countryIso, key } = topic

  if (Topics.isChatKey(key)) {
    return Topics.getChatUserIds(key).map<string>((userId) => getUserRoom(userId))
  }

  return getCountryRooms({ countryIso, cycle })
}
