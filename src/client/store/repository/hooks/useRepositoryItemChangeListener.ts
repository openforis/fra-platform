import { useEffect } from 'react'
import { isAnyOf } from '@reduxjs/toolkit'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { useAppDispatch } from 'client/store/hooks'
import { addAppListener } from 'client/store/middleware/listener'
import { RepositoryActions } from 'client/store/repository/actions'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useCountryRouteParams } from 'client/hooks/routeParams'

export const useRepositoryItemChangeListener = (): void => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    return dispatch(
      addAppListener({
        matcher: isAnyOf(
          RepositoryActions.removeRepositoryItem.fulfilled,
          RepositoryActions.upsertRepositoryItem.fulfilled
        ),
        effect: (action) => {
          const repositoryItem = action.payload as RepositoryItem
          const isGlobal = Objects.isEmpty(repositoryItem.countryIso)
          const path = `${ApiEndPoint.CycleData.Repository.tree()}?global=${isGlobal}`

          const limit: number = undefined
          const page: number = undefined
          const getDataProps = { assessmentName, cycleName, countryIso, path, limit, page }
          dispatch(TablePaginatedActions.getData(getDataProps))
        },
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch])
}
