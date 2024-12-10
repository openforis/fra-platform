import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { TablePaginatedCompareFn } from 'meta/tablePaginated'
import { CountryUserSummary, RoleName } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'

const ranks: Record<RoleName, number> = {
  [RoleName.ADMINISTRATOR]: 5,
  [RoleName.REVIEWER]: 4,
  [RoleName.NATIONAL_CORRESPONDENT]: 3,
  [RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]: 2,
  [RoleName.COLLABORATOR]: 1,
  [RoleName.VIEWER]: 0,
}

export const useUserCompareFn = (): TablePaginatedCompareFn<CountryUserSummary> => {
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<TablePaginatedCompareFn<CountryUserSummary>>(
    (a: CountryUserSummary, b: CountryUserSummary) => {
      const isInvitationA = CountryUserSummaries.isInvitation(a, countryIso)
      const isInvitationB = CountryUserSummaries.isInvitation(b, countryIso)
      if (isInvitationA && !isInvitationB) return 1
      if (!isInvitationA && isInvitationB) return -1

      const rankA = ranks[CountryUserSummaries.getRoleName(a, countryIso)]
      const rankB = ranks[CountryUserSummaries.getRoleName(b, countryIso)]
      return rankB - rankA
    },
    [countryIso]
  )
}
