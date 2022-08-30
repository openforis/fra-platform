import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { Message, MessageTopic, MessageTopicType } from '@meta/messageCenter'
import { User } from '@meta/user'

import { BaseProtocol, DB } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { MessageRepository } from '@server/repository/assessmentCycle/message'
import { MessageTopicRepository } from '@server/repository/assessmentCycle/messageTopic'

import { updateTopicReadTime } from './updateTopicReadTime'

export const addMessage = async (
  props: {
    message: string
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
    type: MessageTopicType
    sectionName: string
  },
  client: BaseProtocol = DB
): Promise<{ topic: MessageTopic; message: Message }> => {
  const { message: messageText, user, countryIso, assessment, cycle, key, type, sectionName } = props

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
      await updateTopicReadTime({ assessment, cycle, topic, user }, t)
    }

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: message,
          section: sectionName,
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
