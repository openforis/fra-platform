import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { Message } from '@meta/messageCenter'
import { User } from '@meta/user'
import { BaseProtocol, DB, Schemas } from '@server/db'
import { ActivityLogRepository } from '@server/repository/assessment/activityLog'
import { MessageRepository } from '@server/repository/public/message'
import { MessageTopicRepository } from '@server/repository/public/messageTopic'

export const addMessage = async (
  props: {
    message: string
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    key: string
  },
  client: BaseProtocol = DB
): Promise<Message> => {
  const { message: messageText, user, countryIso, assessment, cycle, key } = props

  return client.tx(async (t) => {
    let topic = await MessageTopicRepository.getOneOrNone(
      { countryIso, assessment, cycle, key, includeMessages: false },
      client
    )

    if (!topic)
      topic = await MessageTopicRepository.create(
        {
          countryIso,
          assessment,
          cycle,
          key,
        },
        t
      )

    const message = await MessageRepository.create({ message: messageText, topicId: topic.id, user }, t)

    const schemaName = Schemas.getName(assessment)

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: message,
          section: 'messageCenter',
          message: ActivityLogMessage.messageCreate,
          user,
        },
        schemaName,
      },
      t
    )

    return message
  })
}
