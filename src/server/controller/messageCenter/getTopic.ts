import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { MessageTopic } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { MessageTopicRepository } from 'server/repository/assessmentCycle/messageTopic'

import { updateTopicReadTime } from './updateTopicReadTime'

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

  const topic = await MessageTopicRepository.getOneOrNone({ countryIso, assessment, cycle, key, includeMessages }, client)

  if (topic && user) {
    await updateTopicReadTime({ assessment, cycle, topic, user }, client)
  }

  return topic
}
