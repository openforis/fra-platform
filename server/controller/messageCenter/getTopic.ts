import { CountryIso } from '@meta/area'
import { Assessment, Cycle } from '@meta/assessment'
import { MessageTopic } from '@meta/messageCenter'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { MessageTopicRepository } from '@server/repository/assessmentCycle/messageTopic'
import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'

export const getTopic = async (
  props: {
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    includeMessages?: boolean
  },
  client: BaseProtocol = DB
): Promise<MessageTopic | undefined> => {
  const { countryIso, assessment, cycle, key, includeMessages = true, user } = props

  const topic = await MessageTopicRepository.getOneOrNone(
    { countryIso, assessment, cycle, key, includeMessages },
    client
  )

  if (topic && user) {
    const topicUser = await MessageTopicUserRepository.getOneOrNone({ assessment, cycle, topic, user })
    if (topicUser) {
      await MessageTopicUserRepository.update({ assessment, cycle, topic, user })
    } else {
      await MessageTopicUserRepository.create({ assessment, cycle, topic, user })
    }
  }

  return topic
}
