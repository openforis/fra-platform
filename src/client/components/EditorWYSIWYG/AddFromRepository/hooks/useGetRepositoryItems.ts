import { useCallback } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useCountryRouteParams } from 'client/hooks/routeParams'

type Returned = () => void

export const useGetRepositoryItems = (): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  return useCallback<Returned>(() => {
    const limit: number = undefined
    const page: number = undefined
    const path = ApiEndPoint.CycleData.Repository.many()
    const getDataProps = { assessmentName, cycleName, countryIso, limit, page, path }
    dispatch(TablePaginatedActions.getData(getDataProps))
  }, [assessmentName, countryIso, cycleName, dispatch])
}
