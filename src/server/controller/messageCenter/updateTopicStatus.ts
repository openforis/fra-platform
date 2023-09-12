import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { MessageTopic, MessageTopicStatus } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { MessageTopicRepository } from 'server/repository/assessmentCycle/messageTopic'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

export const updateTopicStatus = async (
  props: {
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    sectionName: string
    key: string
    status: MessageTopicStatus
  },
  client: BaseProtocol = DB
): Promise<MessageTopic> => {
  const { user, countryIso, assessment, cycle, sectionName, key, status } = props

  return client.tx(async (t) => {
    const topic = await MessageTopicRepository.updateStatus(
      { countryIso, assessment, cycle, key, status, includeMessages: true },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: topic,
          section: sectionName,
          message: ActivityLogMessage.topicStatusChange,
          countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return topic
  })
}
