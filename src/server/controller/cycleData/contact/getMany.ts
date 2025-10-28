import { CountryIso } from 'meta/area'
import { Assessment } from 'meta/assessment/assessment'
import { Cycle } from 'meta/assessment/cycle'
import { Contact } from 'meta/cycleData'

import { NodeExtRepository } from 'server/db/repository/assessmentCycle/nodeExt'
import { UserRepository } from 'server/db/repository/public/user'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

type Returned = Array<Contact>

export const getMany = async (props: Props): Promise<Returned> => {
  const { assessment, countryIso, cycle } = props

  const getContactsProps = { assessment, cycle, countryIso }
  const prefilled = await UserRepository.getContacts(getContactsProps)

  const getManyProps = { assessment, cycle, countryIso }
  const contacts = await NodeExtRepository.getManyContacts(getManyProps)

  return [...prefilled, ...contacts]
}
