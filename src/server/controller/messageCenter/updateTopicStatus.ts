import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { MessageTopic, MessageTopicStatus } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { MessageTopicRepository } from 'server/repository/assessmentCycle/messageTopic'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
  key: string
  status: MessageTopicStatus
  user: User
}

export const updateTopicStatus = async (props: Props, client: BaseProtocol = DB): Promise<MessageTopic> => {
  const { user, countryIso, assessment, cycle, sectionName, key, status } = props

  return client.tx(async (t) => {
    const target = await MessageTopicRepository.updateStatus(
      { assessment, cycle, countryIso, key, status, includeMessages: true },
      t
    )

    const message = ActivityLogMessage.topicStatusChange
    const activityLog = { target, section: sectionName, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    return target
  })
}
