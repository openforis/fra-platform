import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Contact } from 'meta/cycleData'

import { NodeExtRepository } from 'server/repository/assessmentCycle/nodeExt'
import { UserRepository } from 'server/repository/public/user'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

type Returned = Array<Contact>

export const getMany = async (props: Props): Promise<Returned> => {
  const { assessment, cycle, countryIso } = props

  const getContactsProps = { assessment, cycle, countryIso }
  const prefilled = await UserRepository.getContacts(getContactsProps)

  const getManyProps = { assessment, cycle, countryIso }
  const contacts = await NodeExtRepository.getManyContacts(getManyProps)

  return [...prefilled, ...contacts]
}
