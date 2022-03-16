import { BaseProtocol, DB, Schemas } from '@server/db'
import { CountryIso } from '@meta/area'
import { ActivityLogMessage, Assessment, Cycle } from '@meta/assessment'
import { Message, MessageTopicStatus } from '@meta/messageCenter'
import { User } from '@meta/user'
import { MessageTopicRepository } from '@server/repository/messageTopic'
import { MessageRepository } from '@server/repository/message'
import { ActivityLogRepository, AssessmentRepository } from '@server/repository'

export const addMessage = async (
  props: {
    message: string
    user: User
    topicId?: number
    topic?: {
      countryIso: CountryIso
      assessment: Assessment
      cycle: Cycle
      key: string
      status: MessageTopicStatus
    }
  },
  client: BaseProtocol = DB
): Promise<Message> => {
  const { message: messageText, user, topicId, topic } = props

  return client.tx(async (t) => {
    let messageTopic = null

    if (topicId) messageTopic = await MessageTopicRepository.getOne({ topicId })
    else if (topic) {
      const { countryIso, assessment, cycle, key, status } = topic
      messageTopic = await MessageTopicRepository.create(
        {
          countryIso,
          assessment,
          cycle,
          key,
          status,
        },
        t
      )
    }

    const message = await MessageRepository.create({ message: messageText, topicId: messageTopic.id, user }, t)

    const assessment = await AssessmentRepository.read({ id: messageTopic.assessmentId }, t)
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
