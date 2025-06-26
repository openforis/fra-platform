import { Areas, Country, CountryStatus } from 'meta/area'
import { Cycle } from 'meta/assessment/cycle'
import { Section, SubSection } from 'meta/assessment/section'
import { User } from 'meta/user/user'

import { CollaboratorEditPropertyType } from '../userRole'
import { canEditCycleData } from './canEditCycleData'

export type AuthProps = {
  cycle: Cycle
  country: Country
  user: User
  section?: Section | SubSection
  permission?: CollaboratorEditPropertyType
}

/**
 * CanViewReview - Determines if user can view review indicators for specific sections
 *
 * @param props - Authorization properties
 * @param props.permission - Type of permission (tableData or descriptions)
 * @returns boolean indicating if user can view the review for specified section
 */
export const canViewReview = (props: AuthProps): boolean => {
  const { country, cycle, permission = CollaboratorEditPropertyType.tableData, section, user } = props

  if (!country || !section || !user || !Areas.isISOCountry(country.countryIso)) return false

  return canEditCycleData({
    cycle,
    country,
    user,
    section,
    permission,
    allowedStatuses: [CountryStatus.notStarted, CountryStatus.editing, CountryStatus.review],
  })
}
