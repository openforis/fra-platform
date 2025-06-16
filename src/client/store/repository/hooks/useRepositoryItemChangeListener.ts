import { useEffect } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store/hooks'
import { addAppListener } from 'client/store/middleware/listener'
import { RepositoryActions } from 'client/store/repository/actions'
import { TablePaginatedActions } from 'client/store/tablePaginated/actions'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useRepositoryItemChangeListener = () => {
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
          const global = Objects.isEmpty(repositoryItem.countryIso) ? '?global=true' : ''
          const path = `${ApiEndPoint.CycleData.Repository.many()}${global}`

          const limit: number = undefined
          const page: number = undefined
          const getDataProps = { assessmentName, cycleName, countryIso, path, limit, page }
          dispatch(TablePaginatedActions.getData(getDataProps))
        },
      })
    )
  }, [assessmentName, countryIso, cycleName, dispatch])
}
