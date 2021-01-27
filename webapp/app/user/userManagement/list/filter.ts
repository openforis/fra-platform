// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'ramd... Remove this comment to see the full error message
import * as R from 'ramda'

// @ts-expect-error ts-migrate(2306) FIXME: File '/Users/mirosorja/work/fao/fra-platform/commo... Remove this comment to see the full error message
import { roleKeys } from '@common/countryRole'

export const defaultFilter = {
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'countries' implicitly h... Remove this comment to see the full error message
  countries: [],
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'langs' implicitly has a... Remove this comment to see the full error message
  langs: [],
  // @ts-expect-error ts-migrate(7018) FIXME: Object literal's property 'roles' implicitly has a... Remove this comment to see the full error message
  roles: [],
}

export const includeCountryRole = ({ countries = defaultFilter.countries, roles = defaultFilter.roles }) => (
  countryRole: any
) => {
  return R.isEmpty(roles) && R.isEmpty(countries)
    ? true
    : R.isEmpty(roles)
    ? R.contains(countryRole.countryIso, countries)
    : R.isEmpty(countries)
    ? R.contains(countryRole.role, roles)
    : R.any(
        (roleFilter: any) =>
          R.any(
            (countryFilter: any) => countryRole.role === roleFilter && countryRole.countryIso === countryFilter,
            countries
          ),
        roles
      )
}

export const filterUsers = ({ countries = defaultFilter.countries, roles = defaultFilter.roles }) =>
  R.filter((user: any) =>
    R.any(includeCountryRole({ countries, roles }), user.invitationUuid ? [{ ...user }] : user.roles)
  )

export const filterUserCountryRoles = ({ countries = defaultFilter.countries, roles = defaultFilter.roles }) =>
  R.map((user: any) => ({
    ...user,

    roles: user.invitationUuid ? null : R.filter(includeCountryRole({ countries, roles }), user.roles),
  }))

export const getFilterRoles = ({ roles = defaultFilter.roles }) => (R.isEmpty(roles) ? roleKeys : roles)
