import { Country } from 'meta/area/country'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { canUserEditData } from 'meta/auth/authorizer/_canEditData/canUserEditData'
import { CollaboratorEditPropertyType } from 'meta/user/role/collaborator'
import { User } from 'meta/user/user'

type Props = {
  country: Country
  cycle: Cycle
  permission?: CollaboratorEditPropertyType
  section: Section | SubSection
  user: User
}

/**
 * CanEditSectionData - Determines if user can edit specific data sections
 *
 */
export const canEditSectionData = (props: Props): boolean => {
  return canUserEditData(props)
}
