import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { MessageTopic, MessageTopicStatus } from 'meta/messageCenter/messageTopic'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { MessageTopicRepository } from 'server/db/repository/assessmentCycle/messageTopic'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

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
  const { assessment, countryIso, cycle, key, sectionName, status, user } = props

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
