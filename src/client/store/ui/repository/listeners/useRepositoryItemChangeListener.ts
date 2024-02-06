import { useEffect } from 'react'

import { isAnyOf } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { ApiEndPoint } from 'meta/api/endpoint'

import { useAppDispatch } from 'client/store'
import { addAppListener } from 'client/store/middleware/listener'
import { RepositoryActions } from 'client/store/ui/repository'
import { TablePaginatedActions } from 'client/store/ui/tablePaginated'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

export const useRepositoryItemChangeListener = () => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams()
  const dispatch = useAppDispatch()
  useEffect(() => {
    const unsubscribe = dispatch(
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
    return unsubscribe
  }, [assessmentName, countryIso, cycleName, dispatch])
}
