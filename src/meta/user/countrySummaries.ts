import { CountryIso } from 'meta/area/countryIso'
import { UserCountrySummary } from 'meta/user/countrySummary'
import { UserInvitation } from 'meta/user/invitation'
import { RoleName } from 'meta/user/role/name'
import { UserRole } from 'meta/user/role/role'

const getCountryRoleAndInvitation = (
  countryUserSummary: UserCountrySummary,
  countryIso: CountryIso
): { role?: UserRole; invitation?: UserInvitation } => {
  const f = (role: UserRole | UserInvitation): boolean => role.countryIso === countryIso
  return {
    role: countryUserSummary.roles.find(f),
    invitation: countryUserSummary.invitations.find(f),
  }
}

const getRoleName = (countryUserSummary: UserCountrySummary, countryIso: CountryIso): RoleName | undefined => {
  const { invitation, role } = getCountryRoleAndInvitation(countryUserSummary, countryIso)
  return invitation?.role ?? role?.role
}

const isInvitation = (countryUserSummary: UserCountrySummary, countryIso: CountryIso): boolean => {
  const { invitation, role } = getCountryRoleAndInvitation(countryUserSummary, countryIso)

  return Boolean(!role && invitation)
}

export const UserCountrySummaries = {
  getCountryRoleAndInvitation,
  getRoleName,
  isInvitation,
}
