import { useCallback } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useClosePanel } from 'client/pages/CountryHome/Repository/hooks/useClosePanel'

export const useOnSuccess = (): (() => void) => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  const closePanel = useClosePanel()

  const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=false`

  const limit: number = undefined
  const page: number = undefined

  return useCallback(async () => {
    await dispatch(TablePaginatedActions.getData({ assessmentName, countryIso, cycleName, limit, page, path })).unwrap()
    closePanel()
  }, [assessmentName, closePanel, countryIso, cycleName, dispatch, limit, page, path])
}
