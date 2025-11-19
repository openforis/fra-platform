import { Country } from 'meta/area/country'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { User } from 'meta/user/user'

export type CanEditDataProps = {
  country: Country
  cycle: Cycle
  permission?: CollaboratorEditPropertyType
  section?: Section | SubSection
  user: User
}
