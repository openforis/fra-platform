import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, SectionName } from 'meta/assessment'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { NodeExtRepository } from 'server/repository/assessmentCycle/nodeExt'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: SectionName
  user: User
  uuid: string
}

export const remove = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso, sectionName, user, uuid } = props
  const section = sectionName

  await client.tx(async (t) => {
    const target = (await NodeExtRepository.removeContact({ assessment, cycle, uuid }, t)).uuid
    const message = ActivityLogMessage.contactDelete
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
  })
}
