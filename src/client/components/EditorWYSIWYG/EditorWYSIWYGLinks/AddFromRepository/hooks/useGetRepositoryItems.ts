import { useCallback, useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = () => void

export const useGetRepositoryItems = (): Returned => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  const getRepositoryItems = useCallback<Returned>(() => {
    const limit: number = undefined
    const page: number = undefined
    const path = ApiEndPoint.CycleData.Repository.many()
    const getDataProps = { assessmentName, cycleName, countryIso, limit, page, path }
    dispatch(TablePaginatedActions.getData(getDataProps))
  }, [assessmentName, cycleName, countryIso, dispatch])

  useEffect(() => {
    getRepositoryItems()
  }, [getRepositoryItems])

  return getRepositoryItems
}
