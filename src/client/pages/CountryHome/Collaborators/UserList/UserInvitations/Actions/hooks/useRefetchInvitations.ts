import { useCallback, useMemo } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useRefetchInvitations = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()

  const dispatch = useAppDispatch()

  const getDataProps = useMemo(() => {
    const limit: number = undefined
    const page: number = undefined
    const path = ApiEndPoint.User.invitations()

    return { assessmentName, cycleName, countryIso, limit, page, path }
  }, [assessmentName, countryIso, cycleName])

  return useCallback(() => dispatch(TablePaginatedActions.getData(getDataProps)), [dispatch, getDataProps])
}
