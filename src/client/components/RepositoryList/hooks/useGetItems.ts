import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useGetItems = (isGlobal = false): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()

  const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=${isGlobal}`

  useEffect((): void => {
    const limit: number = undefined
    const page: number = undefined
    dispatch(TablePaginatedActions.getData({ assessmentName, countryIso, cycleName, limit, page, path }))
  }, [assessmentName, countryIso, cycleName, dispatch, path])
}
