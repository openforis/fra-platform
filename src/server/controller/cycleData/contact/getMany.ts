import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Contact } from 'meta/cycleData'
import { Contacts } from 'meta/cycleData/contact'
import { RoleName, UserStatus } from 'meta/user'

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
    const statuses = [UserStatus.active]
    const withProps = true
    const roles = [RoleName.COLLABORATOR, RoleName.NATIONAL_CORRESPONDENT, RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]
    const getManyProps = { assessment, cycle, countryIso, withProps, statuses, roles }
    const users = await UserRepository.getMany(getManyProps, t)

    const prefilled = users.map((user) => Contacts.fromUser({ countryIso, cycle, user }))

    /* const contacts = await NodeExtRepository.getMany<Contact>({ assessment, cycle, countryIso, type: NodeExtType.contact },t) */
    const contacts: Array<Contact> = []

    return [...prefilled, ...contacts]
  })
}
