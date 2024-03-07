import { useEffect } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'

import { addAppListener, useAppDispatch } from 'client/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useRepositoryItemChangeListener = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    return dispatch(
      addAppListener({
        matcher: isAnyOf(
          RepositoryActions.removeRepositoryItem.fulfilled,
          RepositoryActions.upsertRepositoryItem.fulfilled
        ),
        effect: (action) => {
          const repositoryItem = action.payload
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
