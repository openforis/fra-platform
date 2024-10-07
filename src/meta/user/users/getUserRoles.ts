import { CountryIso } from 'meta/area'
import { Cycle } from 'meta/assessment'
import type { User } from 'meta/user/user'
import { Users } from 'meta/user/users/index'

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
  isAdministrator: Users.isAdministrator(user),
  isAlternateNationalCorrespondent: Users.isAlternateNationalCorrespondent(user, countryIso, cycle),
  isCollaborator: Users.isCollaborator(user, countryIso, cycle),
  isNationalCorrespondent: Users.isNationalCorrespondent(user, countryIso, cycle),
  isReviewer: Users.isReviewer(user, countryIso, cycle),
  isViewer: Users.isViewer(user, countryIso, cycle),
})
