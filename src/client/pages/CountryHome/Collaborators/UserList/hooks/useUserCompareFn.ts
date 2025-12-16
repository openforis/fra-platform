import { useCallback } from 'react'

import { CountryIso } from 'meta/area/countryIso'
import { TablePaginatedCompareFn } from 'meta/tablePaginated/compareFn'
import { UserCountrySummaries } from 'meta/user/countrySummaries'
import { UserCountrySummary } from 'meta/user/countrySummary'
import { RoleName } from 'meta/user/role/name'

import { useCountryRouteParams } from 'client/hooks/routeParams'

const ranks: Record<RoleName, number> = {
  [RoleName.ADMINISTRATOR]: 6,
  [RoleName.REGIONAL_FOCAL_POINT]: 5,
  [RoleName.REVIEWER]: 4,
  [RoleName.NATIONAL_CORRESPONDENT]: 3,
  [RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]: 2,
  [RoleName.COLLABORATOR]: 1,
  [RoleName.VIEWER]: 0,
}

export const useUserCompareFn = (): TablePaginatedCompareFn<UserCountrySummary> => {
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<TablePaginatedCompareFn<UserCountrySummary>>(
    (a: UserCountrySummary, b: UserCountrySummary) => {
      const roleNameA = UserCountrySummaries.getRoleName(a, countryIso)
      const roleNameB = UserCountrySummaries.getRoleName(b, countryIso)

      if (roleNameA === roleNameB) {
        const isInvitationA = UserCountrySummaries.isInvitation(a, countryIso)
        const isInvitationB = UserCountrySummaries.isInvitation(b, countryIso)
        if (isInvitationA && !isInvitationB) return 1
        if (!isInvitationA && isInvitationB) return -1
      }

      const rankA = ranks[roleNameA]
      const rankB = ranks[roleNameB]

      return rankB - rankA
    },
    [countryIso]
  )
}
