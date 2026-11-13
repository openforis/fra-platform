import { CountryIso } from 'meta/area/countryIso'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic, MessageTopicType } from 'meta/messageCenter/messageTopic'

import { getMessageTopicRooms } from './getMessageTopicRooms'

const countryIso = 'X01' as CountryIso
const cycle = { uuid: 'cycle-2025-uuid' } as Cycle

const getTopic = (props: { key: string; type: MessageTopicType }): MessageTopic =>
  ({ countryIso, ...props }) as MessageTopic

describe('getMessageTopicRooms', () => {
  test('chat key goes to its two users even when the topic type is not chat', () => {
    const topic = getTopic({ key: 'message_board_chat_3_7', type: MessageTopicType.review })

    expect(getMessageTopicRooms({ cycle, topic })).toEqual(['user-3', 'user-7'])
  })

  test('chat type with a key that is not a chat key goes to the country room and the admins', () => {
    const topic = getTopic({ key: 'dataRow_9a7b', type: MessageTopicType.chat })

    expect(getMessageTopicRooms({ cycle, topic })).toEqual(['cycle-2025-uuid-X01', 'admins'])
  })
})
