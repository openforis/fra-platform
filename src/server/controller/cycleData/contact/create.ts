import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, SectionNames } from 'meta/assessment'
import { Contact, contactFields } from 'meta/cycleData'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { NodeExtRepository } from 'server/repository/assessmentCycle/nodeExt'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  contact: Contact
  user: User
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso, contact, user } = props

  await client.tx(async (t) => {
    // create contact
    const target = await NodeExtRepository.upsert({ assessment, cycle, countryIso, nodeExt: contact }, t)
    const message = ActivityLogMessage.contactCreate
    const section = SectionNames.contacts
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    // create fields
    await Promise.all(
      contactFields.map(async (contactField) => {
        const nodeExt = contact[contactField]
        await NodeExtRepository.upsert({ assessment, cycle, countryIso, nodeExt }, t)
      })
    )
  })
}
