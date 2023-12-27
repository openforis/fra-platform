import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, NodeValue, SectionNames } from 'meta/assessment'
import { ContactNode } from 'meta/cycleData'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { NodeExtRepository } from 'server/repository/assessmentCycle/nodeExt'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  nodeExt: ContactNode
  raw: NodeValue['raw']
  user: User
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso, nodeExt, raw, user } = props

  nodeExt.value.raw = raw

  await client.tx(async (t) => {
    const target = await NodeExtRepository.upsert({ assessment, cycle, countryIso, nodeExt }, t)
    const message = ActivityLogMessage.contactUpdate
    const section = SectionNames.contacts
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
  })
}
