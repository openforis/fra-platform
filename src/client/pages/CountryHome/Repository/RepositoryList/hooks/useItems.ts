import { useEffect } from 'react'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItemTree } from 'meta/cycleData/repository/item'

import { useAppDispatch, useInjectSlice } from 'client/store/hooks'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useTablePaginatedData } from 'client/store/tablePaginated/hooks/tablePaginated'
import { TablePaginatedSlice } from 'client/store/tablePaginated/slice'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useItems = (isGlobal = false): Array<RepositoryItemTree> => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  useInjectSlice(TablePaginatedSlice)

  const path = isGlobal
    ? `${ApiEndPoint.CycleData.Repository.tree()}?global=true`
    : ApiEndPoint.CycleData.Repository.tree()

  useEffect((): void => {
    const limit: number = undefined
    const page: number = undefined
    dispatch(TablePaginatedActions.getData({ assessmentName, countryIso, cycleName, limit, page, path }))
  }, [assessmentName, countryIso, cycleName, dispatch, path])

  return useTablePaginatedData<RepositoryItemTree>({ path }) ?? []
}
