import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { Message, MessageTopic, MessageTopicType } from '@meta/messageCenter'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { MessageRepository } from '@server/repository/assessmentCycle/message'
import { MessageTopicRepository } from '@server/repository/assessmentCycle/messageTopic'
import { MessageTopicUserRepository } from '@server/repository/assessmentCycle/messageTopicUser'

export const addMessage = async (
  props: {
    message: string
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    type: MessageTopicType
  },
  client: BaseProtocol = DB
): Promise<{ topic: MessageTopic; message: Message }> => {
  const { message: messageText, user, countryIso, assessment, cycle, key, type } = props

  return client.tx(async (t) => {
    let topic = await MessageTopicRepository.getOneOrNone(
      { countryIso, assessment, cycle, key, includeMessages: false },
      client
    )

    if (!topic) {
      topic = await MessageTopicRepository.create({ countryIso, assessment, cycle, key, type }, t)
    }

    const message = await MessageRepository.create({ assessment, cycle, message: messageText, topic, user }, t)

    if (topic && user) {
      const topicUser = await MessageTopicUserRepository.getOneOrNone({ assessment, cycle, topic, user })
      if (topicUser) {
        await MessageTopicUserRepository.update({ assessment, cycle, topic, user })
      } else {
        await MessageTopicUserRepository.create({ assessment, cycle, topic, user })
      }
    }

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: message,
          section: 'messageCenter',
          message: ActivityLogMessage.messageCreate,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    return { topic, message }
  })
}
