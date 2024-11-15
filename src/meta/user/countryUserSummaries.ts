import { CountryIso } from 'meta/area'
import { CountryUserSummary } from 'meta/user/countryUserSummary'
import { UserInvitation } from 'meta/user/userInvitation'
import { RoleName, UserRole } from 'meta/user/userRole'

const getCountryRoleAndInvitation = (
  countryUserSummary: CountryUserSummary,
  countryIso: CountryIso
): { role?: UserRole<RoleName>; invitation?: UserInvitation } => {
  const f = (role: UserRole<RoleName> | UserInvitation) => role.countryIso === countryIso
  return {
    role: countryUserSummary.roles.find(f),
    invitation: countryUserSummary.invitations.find(f),
  }
}

const isInvitation = (countryUserSummary: CountryUserSummary, countryIso: CountryIso) => {
  const { role, invitation } = getCountryRoleAndInvitation(countryUserSummary, countryIso)

  return Boolean(!role && invitation)
}

export const CountryUserSummaries = {
  getCountryRoleAndInvitation,
  isInvitation,
}
