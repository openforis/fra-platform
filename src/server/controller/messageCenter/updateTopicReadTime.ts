import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic } from 'meta/messageCenter/messageTopic'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { MessageTopicUserRepository } from 'server/db/repository/assessmentCycle/messageTopicUser'

export const updateTopicReadTime = async (
  props: {
    assessment: Assessment
    cycle: Cycle
    topic: MessageTopic
    user: User
  },
  client: BaseProtocol = DB
): Promise<void> => {
  const { assessment, cycle, topic, user } = props

  return client.tx(async (t) => {
    const topicUser = await MessageTopicUserRepository.getOneOrNone({ assessment, cycle, topic, user })
    if (topicUser) {
      await MessageTopicUserRepository.update({ assessment, cycle, topic, user }, t)
    } else {
      await MessageTopicUserRepository.create({ assessment, cycle, topic, user }, t)
    }
  })
}
