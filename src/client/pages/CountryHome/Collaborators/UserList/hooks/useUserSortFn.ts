import { useCallback } from 'react'

import { CountryIso } from 'meta/area'
import { CountryUserSummary } from 'meta/user'
import { CountryUserSummaries } from 'meta/user/countryUserSummaries'

import { useCountryRouteParams } from 'client/hooks/useRouteParams'
import { SortFn } from 'client/components/TablePaginated/TablePaginated'

export const useUserSortFn = (): SortFn<CountryUserSummary> => {
  const { countryIso } = useCountryRouteParams<CountryIso>()

  return useCallback(
    (a: Array<CountryUserSummary>) => {
      const sort = (a: CountryUserSummary, b: CountryUserSummary) => {
        const isInvitationA = CountryUserSummaries.isInvitation(a, countryIso)
        const isInvitationB = CountryUserSummaries.isInvitation(b, countryIso)

        if (isInvitationA && !isInvitationB) return 1
        if (!isInvitationA && isInvitationB) return -1
        return 0
      }
      return [...a].sort(sort)
    },
    [countryIso]
  )
}
