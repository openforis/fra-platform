import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { ActivityLogMessage, Assessment, Cycle, NodeValue } from 'meta/assessment'
import { Contact, ContactField, contactFields } from 'meta/cycleData'
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
  field: ContactField
  raw: NodeValue['raw']
  user: User
}

export const create = async (props: Props, client: BaseProtocol = DB): Promise<void> => {
  const { assessment, cycle, countryIso, sectionName, contact, field, raw, user } = props
  const section = sectionName

  await client.tx(async (t) => {
    // create contact
    const target = await NodeExtRepository.upsert({ assessment, cycle, countryIso, nodeExt: contact }, t)
    const message = ActivityLogMessage.contactCreate
    const activityLog = { target, section, message, countryIso, user }
    await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)

    // create fields
    await Promise.all(
      contactFields.map(async (contactField) => {
        const nodeExt = contact[contactField]
        const creatingField = contactField === field
        if (creatingField) {
          Objects.setInPath({ obj: nodeExt, path: ['value', 'raw'], value: raw })
        }

        const target = await NodeExtRepository.upsert({ assessment, cycle, countryIso, nodeExt }, t)

        if (creatingField) {
          const message = ActivityLogMessage.contactUpdate
          const activityLog = { target, section, message, countryIso, user }
          await ActivityLogRepository.insertActivityLog({ activityLog, assessment, cycle }, t)
        }
      })
    )
  })
}
