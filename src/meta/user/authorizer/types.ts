import { Country } from 'meta/area'
import { Cycle, Section, SubSection } from 'meta/assessment'
import { User } from 'meta/user/user'
import { CollaboratorEditPropertyType } from 'meta/user/userRole'

export type AuthProps = {
  cycle: Cycle
  country: Country
  user: User
  section?: Section | SubSection
  permission?: CollaboratorEditPropertyType
}
