import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment'
import type { User } from 'meta/user/user'

import {
  isAdministrator,
  isAlternateNationalCorrespondent,
  isCollaborator,
  isNationalCorrespondent,
  isReviewer,
  isViewer,
} from './users'

type UserRoles = {
  isAdministrator: boolean
  isAlternateNationalCorrespondent: boolean
  isCollaborator: boolean
  isNationalCorrespondent: boolean
  isReviewer: boolean
  isViewer: boolean
}

/**
 * Get the roles of a user for a specific country and cycle
 * @param {User} user - User
 * @param {CountryIso} countryIso - Country ISO code
 * @param {Cycle} cycle - Cycle
 * @returns {UserRoles} An object containing boolean flags for each possible role
 */
export const getUserRoles = (user: User, countryIso: CountryIso, cycle: Cycle): UserRoles => ({
  isAdministrator: isAdministrator(user),
  isAlternateNationalCorrespondent: isAlternateNationalCorrespondent(user, countryIso, cycle),
  isCollaborator: isCollaborator(user, countryIso, cycle),
  isNationalCorrespondent: isNationalCorrespondent(user, countryIso, cycle),
  isReviewer: isReviewer(user, countryIso, cycle),
  isViewer: isViewer(user, countryIso, cycle),
})
