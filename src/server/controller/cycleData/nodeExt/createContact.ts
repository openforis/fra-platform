import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle } from 'meta/assessment'
import { NodeExt, NodeExtType } from 'meta/nodeExt'
import { Contact, User } from 'meta/user'

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

export const createContact = async (props: Props, client: BaseProtocol = DB): Promise<NodeExt> => {
  const { assessment, cycle, countryIso, sectionName, contact, user } = props

  return client.tx(async (t) => {
    const createProps = { assessment, cycle, countryIso, type: NodeExtType.contact, props: contact.props }
    const target = await NodeExtRepository.create(createProps, t)

    const section = sectionName
    const message = ActivityLogMessage.contactCreate
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    return target
  })
}
