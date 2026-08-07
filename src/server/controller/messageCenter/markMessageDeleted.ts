import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { User } from 'meta/user/user'

import { BaseProtocol, DB } from 'server/db/db'
import { MessageRepository } from 'server/db/repository/assessmentCycle/message'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
  id: number
  user: User
}

export const markMessageDeleted = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, id, sectionName, user } = props

  return client.tx(async (t) => {
    const { topicUuid } = await MessageRepository.markDeleted({ assessment, cycle, id }, t)

    const message = ActivityLogMessage.messageMarkDeleted
    const target = { id, topicUuid }
    const activityLog = { target, section: sectionName, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
  })
}
