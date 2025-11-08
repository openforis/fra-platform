import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { SectionNames } from 'meta/assessment/section'
import { Topics } from 'meta/messageCenter'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { MessageTopicRepository } from 'server/db/repository/assessmentCycle/messageTopic'
import { NodeExtRepository } from 'server/db/repository/assessmentCycle/nodeExt'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  user: User
  uuid: string
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, user, uuid } = props

  await client.tx(async (t) => {
    const target = await NodeExtRepository.removeContact({ assessment, cycle, uuid }, t)
    await MessageTopicRepository.removeMany({ assessment, cycle, keyPrefix: Topics.getContactKey(target) }, t)

    const message = ActivityLogMessage.contactDelete
    const section = SectionNames.contacts
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
  })
}
