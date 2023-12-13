import { CountryIso } from 'meta/area'
import { Assessment, Cycle } from 'meta/assessment'
import { Contact } from 'meta/cycleData'
import { ContactValue } from 'meta/cycleData/contact'
import { RoleName, User, Users, UserStatus } from 'meta/user'

import { MetadataController } from 'server/controller/metadata'
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
    const sections = await MetadataController.getSections({ assessment, cycle }, t)

    const createContact = (user: User): Contact => {
      const userRole = Users.getRole(user, countryIso, cycle)

      const { uuid } = user
      const { name, surname, title: _appellation } = user.props
      // TODO: Migration step to fix user.props.appellation
      const appellation = _appellation?.toLowerCase()
      const institution = userRole?.props?.organization
      const role = userRole?.role as ContactValue['role']
      const contributions = Users.getUserTableAnchors({ user, sections, cycle, countryIso })

      const props = { readOnly: true }
      const value = { role, appellation, name, surname, institution, contributions }

      return { uuid, countryIso, props, value }
    }

    const prefilled = users.map(createContact)

    /* const contacts = await NodeExtRepository.getMany<Contact>({ assessment, cycle, countryIso, type: NodeExtType.contact },t) */
    const contacts: Array<Contact> = []

    return [...prefilled, ...contacts]
  })
}
