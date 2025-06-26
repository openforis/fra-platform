import { Areas, Country } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { canEditCycleData } from 'meta/user/authorizer/canEditCycleData'
import { User } from 'meta/user/user'
import { CollaboratorEditPropertyType } from 'meta/user/userRole'

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
export const canEditData = (props: {
  cycle: Cycle
  section: Section | SubSection
  country: Country
  user: User
  permission?: CollaboratorEditPropertyType
}): boolean => {
  const { country, cycle, permission, section, user } = props

  if (!country) return false
  if (!Areas.isISOCountry(country.countryIso)) return false

  return canEditCycleData({
    cycle,
    country,
    user,
    section,
    permission,
  })
}
