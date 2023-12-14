import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Contact } from 'meta/cycleData'

import { BaseProtocol, DB } from 'server/db'
import { UserRepository } from 'server/repository/public/user'

type Props = {
  assessment: Assessment
  cycle: Cycle
  countryIso: CountryIso
}

type Returned = Array<Contact>

export const getMany = async (props: Props, client: BaseProtocol = DB): Promise<Returned> => {
  const { assessment, cycle, countryIso } = props

  return client.tx(async (t) => {
    const getContactsProps = { assessment, cycle, countryIso }
    const prefilled = await UserRepository.getContacts(getContactsProps, t)

    /* const contacts = await NodeExtRepository.getMany<Contact>({ assessment, cycle, countryIso, type: NodeExtType.contact },t) */
    const contacts: Array<Contact> = []

    return [...prefilled, ...contacts]
  })
}
