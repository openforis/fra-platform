import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { Contact } from 'meta/contact'
import { User } from 'meta/user'

import { BaseProtocol, DB } from 'server/db'
import { NodeExtRepository } from 'server/repository/assessmentCycle/nodeExt'
import { ActivityLogRepository } from 'server/repository/public/activityLog'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
  sectionName: string
  contact: Contact
  user: User
}

export const updateContact = async (props: Props, client: BaseProtocol = DB): Promise<Contact> => {
  const { assessment, cycle, countryIso, sectionName, contact, user } = props

  return client.tx(async (t) => {
    const updateProps = { assessment, cycle, nodeExt: contact }
    const target = await NodeExtRepository.update<Contact>(updateProps, t)

    const section = sectionName
    const message = ActivityLogMessage.contactUpdate
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    return target
  })
}
