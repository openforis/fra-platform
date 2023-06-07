import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { MessageTopicUserRepository } from 'server/repository/assessmentCycle/messageTopicUser'

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
