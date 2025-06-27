import { Areas, Country } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { canEditCycleData } from 'meta/user/authorizer/canEditCycleData'
import { User } from 'meta/user/user'
import { CollaboratorEditPropertyType } from 'meta/user/userRole'

type Props = {
  country: Country
  cycle: Cycle
  permission?: CollaboratorEditPropertyType
  section: Section | SubSection
  user: User
}

// Option 1:
// -> canEditCycleData (canEditSomeData): if user can edit at least 1 table or 1 description
// -> canEditData (canEditSectionData): if user can edit the specific table or description passed as parameter

// Option 2:
// -> we leave only canEditCycleData (canEditData)
/**
 * CanEditData - Determines if user can edit specific data sections
 *
 * @param props.country
 * @param props.cycle
 * @param props.section
 * @param props.user
 * @param props.permission - Type of permission (tableData or descriptions)
 * @returns boolean indicating if user can edit
 */
export const canEditData = (props: Props): boolean => {
  const { country, cycle, permission, section, user } = props

  if (!country) return false
  if (!Areas.isISOCountry(country.countryIso)) return false

  return canEditCycleData({ cycle, country, user, section, permission })
}
