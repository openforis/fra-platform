import { Country } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { User } from 'meta/user/user'
import { CollaboratorEditPropertyType } from 'meta/user/userRole'

import { canUserEditData } from './_canEditData/canUserEditData'

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
