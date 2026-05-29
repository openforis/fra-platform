import { useCallback } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'

import { useAppDispatch } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useCountryRouteParams } from 'client/hooks/routeParams'
import { useRepositoryListContext } from 'client/components/RepositoryList/context'

export const useOnSuccess = (onClose: () => void): (() => void) => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  const { isGlobal } = useRepositoryListContext()
  const dispatch = useAppDispatch()

  const path = `${ApiEndPoint.CycleData.Repository.many()}?global=${isGlobal}`
  const limit: number = undefined
  const page: number = undefined

  return useCallback(async () => {
    await dispatch(TablePaginatedActions.getData({ assessmentName, countryIso, cycleName, limit, page, path })).unwrap()
    onClose()
  }, [assessmentName, countryIso, cycleName, dispatch, limit, onClose, page, path])
}
