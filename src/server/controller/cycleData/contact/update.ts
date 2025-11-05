import { CountryIso } from 'meta/area/countryIso'
import { ActivityLogMessage } from 'meta/assessment/activityLog'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { NodeValue } from 'meta/assessment/node'
import { SectionNames } from 'meta/assessment/section'
import { ContactNode } from 'meta/cycleData'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db/db'
import { NodeExtRepository } from 'server/db/repository/assessmentCycle/nodeExt'
import { ActivityLogRepository } from 'server/db/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  nodeExt: ContactNode
  raw: NodeValue['raw']
  user: User
}

export const update = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, countryIso, cycle, nodeExt, raw, user } = props

  nodeExt.value.raw = raw

  await client.tx(async (t) => {
    const target = await NodeExtRepository.upsert({ assessment, cycle, countryIso, nodeExt }, t)
    const message = ActivityLogMessage.contactUpdate
    const section = SectionNames.contacts
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
  })
}
