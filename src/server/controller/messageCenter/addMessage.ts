import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { Message, MessageTopic, MessageTopicType, Topics } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { SectionRepository } from 'server/repository/assessment/section'
import { MessageRepository } from 'server/repository/assessmentCycle/message'
import { MessageTopicRepository } from 'server/repository/assessmentCycle/messageTopic'
import { ActivityLogRepository } from 'server/repository/public/activityLog'
import { MailService } from 'server/service'
import { ProcessEnv } from 'server/utils'

import { UserController } from '../user'
import { updateTopicReadTime } from './updateTopicReadTime'

export const addMessage = async (
  props: {
    message: string
    user: User
    countryIso: CountryIso
    assessment: Assessment
    cycle: Cycle
    sectionName: string
    key: string
    type: MessageTopicType
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
      // Country Message board section_uuid = null
      let section
      if (type === MessageTopicType.review && sectionName)
        section = await SectionRepository.getOne({
          assessment,
          cycle,
          sectionName,
        })
      topic = await MessageTopicRepository.create({ countryIso, assessment, cycle, key, type, section }, t)
    }

    const message = await MessageRepository.create({ assessment, cycle, message: messageText, topic, user }, t)

    if (user) {
      await updateTopicReadTime({ assessment, cycle, topic, user }, t)
    }

    await ActivityLogRepository.insertActivityLog(
      {
        activityLog: {
          target: message,
          section: sectionName,
          message: ActivityLogMessage.messageCreate,
          countryIso,
          user,
        },
        assessment,
        cycle,
      },
      t
    )

    if (topic.type === MessageTopicType.chat) {
      const recipientId = Topics.getChatRecipientId(topic, user)

      const recipient = await UserController.getOne({ id: recipientId })

      await MailService.oneToOneMessage({
        countryIso,
        assessmentName: assessment.props.name,
        cycleName: cycle.name,
        recipient,
        sender: user,
        url: ProcessEnv.appUri,
      })
    }

    return { topic, message }
  })
}
