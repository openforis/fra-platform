import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { MessageTopic, MessageTopicStatus } from '@meta/messageCenter'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { MessageTopicRepository } from '@server/repository/assessmentCycle/messageTopic'

export const updateTopicStatus = async (
  props: {
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    status: MessageTopicStatus
  },
  client: BaseProtocol = DB
): Promise<{ topic: MessageTopic }> => {
  const { user, countryIso, assessment, cycle, key, status } = props

  return client.tx(async (t) => {
    const topic = await MessageTopicRepository.updateStatus(
      { countryIso, assessment, cycle, key, status, includeMessages: true },
      t
    )

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: topic,
          section: 'messageCenter',
          message: ActivityLogMessage.topicStatusChange,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return { topic }
  })
}
