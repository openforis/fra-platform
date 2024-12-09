import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { CountryUserSummary, RoleName } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { SortFn } from 'client/components/TablePaginated/TablePaginated'

const ranks: Record<RoleName, number> = {
  [RoleName.ADMINISTRATOR]: 5,
  [RoleName.REVIEWER]: 4,
  [RoleName.NATIONAL_CORRESPONDENT]: 3,
  [RoleName.ALTERNATE_NATIONAL_CORRESPONDENT]: 2,
  [RoleName.COLLABORATOR]: 1,
  [RoleName.VIEWER]: 0,
}

export const useUserSortFn = (): SortFn<CountryUserSummary> => {
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback<SortFn<CountryUserSummary>>(
    (userSummaries: Array<CountryUserSummary>) => {
      const sort = (a: CountryUserSummary, b: CountryUserSummary) => {
        const isInvitationA = CountryUserSummaries.isInvitation(a, countryIso)
        const isInvitationB = CountryUserSummaries.isInvitation(b, countryIso)
        if (isInvitationA && !isInvitationB) return 1
        if (!isInvitationA && isInvitationB) return -1

        const rankA = ranks[CountryUserSummaries.getRoleName(a, countryIso)]
        const rankB = ranks[CountryUserSummaries.getRoleName(b, countryIso)]
        return rankB - rankA
      }
      return [...userSummaries].sort(sort)
    },
    [countryIso]
  )
}
