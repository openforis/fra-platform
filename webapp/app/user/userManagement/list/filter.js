import * as R from 'ramda'

import { roleKeys } from '@common/countryRole'

export const defaultFilter = {
  countries: [],
  langs: [],
  roles: []
}

export const includeCountryRole = ({
                                     countries = defaultFilter.countries,
                                     roles = defaultFilter.roles
                                   }) =>
  countryRole => {

    return R.isEmpty(roles) && R.isEmpty(countries)
      ? true
      : R.isEmpty(roles)
        ? R.contains(countryRole.countryIso, countries)
        : R.isEmpty(countries)
          ? R.contains(countryRole.role, roles)
          : R.any(roleFilter =>
              R.any(countryFilter =>
                countryRole.role === roleFilter && countryRole.countryIso === countryFilter
                , countries)
            , roles)
  }

export const filterUsers = ({
                              countries = defaultFilter.countries,
                              roles = defaultFilter.roles
                            }) =>
  R.filter(
    user => R.any(
      includeCountryRole({countries, roles}),
      user.invitationUuid ? [{...user}] : user.roles
    )
  )

export const filterUserCountryRoles = ({
                                         countries = defaultFilter.countries,
                                         roles = defaultFilter.roles
                                       }) =>
  R.map(user => ({
    ...user,
    roles: user.invitationUuid
      ? null
      : R.filter(
        includeCountryRole({countries, roles}),
        user.roles
      )
  }))

export const getFilterRoles = ({roles = defaultFilter.roles}) =>
  R.isEmpty(roles) ? roleKeys : roles

