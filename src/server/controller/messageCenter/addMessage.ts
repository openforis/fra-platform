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

  const assessmentName = assessment.props.name
  const cycleName = cycle.name

  return client.tx(async (t) => {
    let topic = await MessageTopicRepository.getOneOrNone(
      { countryIso, assessment, cycle, key, includeMessages: false },
      client
    )

    if (!topic) {
      // Country Message board section_uuid = null
      const section =
        type === MessageTopicType.review && sectionName
          ? await SectionRepository.getOne({ assessment, cycle, sectionName })
          : undefined
      topic = await MessageTopicRepository.create({ countryIso, assessment, cycle, key, type, section }, t)
    }

    const message = await MessageRepository.create({ assessment, cycle, message: messageText, topic, user }, t)

    if (user) {
      await updateTopicReadTime({ assessment, cycle, topic, user }, t)
    }

    const activityLog = {
      target: message,
      section: sectionName,
      message: ActivityLogMessage.messageCreate,
      countryIso,
      user,
    }
    await ActivityLogRepository.insertActivityLog({ assessment, cycle, activityLog }, t)

    if (topic.type === MessageTopicType.chat) {
      const recipientId = Topics.getChatRecipientId(topic, user)
      const recipient = await UserController.getOne({ id: recipientId })
      const sender = user
      const url = ProcessEnv.appUri

      await MailService.oneToOneMessage({ assessmentName, cycleName, countryIso, recipient, sender, url })
    }

    return { topic, message }
  })
}
