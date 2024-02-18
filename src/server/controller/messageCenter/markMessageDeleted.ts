import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { MessageRepository } from 'server/repository/assessmentCycle/message'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
  id: number
  user: User
}

export const markMessageDeleted = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { countryIso, assessment, cycle, sectionName, id, user } = props

  return client.tx(async (t) => {
    const target = await MessageRepository.markDeleted({ assessment, cycle, id }, t)

    const message = ActivityLogMessage.messageMarkDeleted
    const activityLog = { target, section: sectionName, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
  })
}
