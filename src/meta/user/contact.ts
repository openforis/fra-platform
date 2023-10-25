import { CountryIso } from 'meta/area'
import { SectionName } from 'meta/assessment'
import { RoleName } from 'meta/user/userRole'

export interface ContactProps {
  index: number
  role: RoleName.NATIONAL_CORRESPONDENT | RoleName.ALTERNATE_NATIONAL_CORRESPONDENT | RoleName.COLLABORATOR
  appellation: string
  name: string
  surname: string
  institution: string
  contribution: Array<SectionName>
}

export interface Contact {
  id: number
  uuid: string
  countryIso: CountryIso
  props: ContactProps
}
