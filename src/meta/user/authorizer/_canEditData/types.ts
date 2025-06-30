import { Country } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { User } from 'meta/user/user'
import { CollaboratorEditPropertyType } from 'meta/user/userRole'

export type CanEditDataProps = {
  country: Country
  cycle: Cycle
  permission?: CollaboratorEditPropertyType
  section?: Section | SubSection
  user: User
}
