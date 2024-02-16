import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area'

import { useAppDispatch } from 'client/store'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useGetRepositoryItems = (): void => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const limit: number = undefined
    const page: number = undefined
    const path = ApiEndPoint.CycleData.Repository.many()
    const getDataProps = { assessmentName, cycleName, countryIso, limit, page, path }
    dispatch(TablePaginatedActions.getData(getDataProps))
  }, [countryIso, dispatch, assessmentName, cycleName])
}
