import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useReset = (isGlobal: boolean): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  const path = `${ApiEndPoint.CycleData.Repository.many()}?global=${isGlobal}`

  useEffect(() => {
    dispatch(TablePaginatedActions.resetFilters({ path }))
    dispatch(TablePaginatedActions.resetData({ path }))
  }, [assessmentName, countryIso, cycleName, dispatch, path])
}
