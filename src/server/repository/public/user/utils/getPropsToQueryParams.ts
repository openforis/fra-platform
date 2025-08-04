import { Objects } from 'utils/objects'

import { RoleName, UserStatus } from 'meta/user'

import { UserQueryParams } from 'server/repository/public/user/UserQueryParams'
import { UsersGetManyProps } from 'server/repository/public/user/usersGetManyProps'

type Returned = { whereConditions: Array<string>; queryParams: UserQueryParams }

export const getPropsToQueryParams = (props: UsersGetManyProps): Returned => {
  const { countryIso, filters = {}, limit, offset } = props

  const {
    administrators,
    countries,
    disabled,
    excludeUuids,
    fullName,
    invitations = true,
    roles,
    statuses: defaultStatuses = [UserStatus.active],
  } = filters

  // Only return users with active status, unless other statuses specified outside
  const statuses = disabled ? [UserStatus.disabled] : defaultStatuses

  const queryParams: UserQueryParams = {}

  if (fullName) queryParams.fullName = fullName.trim().toLowerCase()
  if (countryIso) queryParams.countryIso = countryIso
  const hasCountries = !Objects.isEmpty(countries)
  if (hasCountries) queryParams.countries = countries
  const hasExcludeUUIDs = !Objects.isEmpty(excludeUuids)
  if (hasExcludeUUIDs) queryParams.excludeUuids = excludeUuids

  const allRoles = administrators
    ? Object.values(RoleName)
    : Object.values(RoleName).filter((role) => role !== RoleName.ADMINISTRATOR)

  const selectedRoles = !Objects.isEmpty(roles) ? roles : allRoles
  if (selectedRoles) queryParams.roles = selectedRoles

  queryParams.statuses = statuses

  if (!Objects.isNil(limit)) queryParams.limit = limit
  if (!Objects.isNil(offset)) queryParams.offset = offset

  const withInvitations = invitations ? `or (invitation is not null and invitation ->> 'role' in ($(roles:list)))` : ''

  const whereConditions = [
    fullName && `full_name ilike '%' || $(fullName) || '%'`,
    selectedRoles &&
      `(
      (role is not null and role ->> 'role' in ($(roles:list))) ${withInvitations}
    )`,
    countryIso && `country_iso = $(countryIso)`,
    hasCountries && `country_iso in ($(countries:list))`,
    hasExcludeUUIDs && `uuid not in ($(excludeUuids))`,
    `status in ($(statuses:list))`,
  ].filter(Boolean)

  return { queryParams, whereConditions }
}
