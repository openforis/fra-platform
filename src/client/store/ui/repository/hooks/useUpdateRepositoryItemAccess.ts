import { useCallback } from 'react'

import { Objects } from 'utils/objects'

import { CountryIso } from 'meta/area'
import { RepositoryItem } from 'meta/cycleData'

import { useAppDispatch } from 'client/store/store'
import { RepositoryActions } from 'client/store/ui/repository'
import { useCountryRouteParams } from 'client/hooks/useRouteParams'

type Returned = {
  (repositoryItem: RepositoryItem, value: boolean): void
}

export const useUpdateRepositoryItemAccess = (): Returned => {
  const { assessmentName, cycleName, countryIso } = useCountryRouteParams<CountryIso>()
  const dispatch = useAppDispatch()
  return useCallback<Returned>(
    (repositoryItem: RepositoryItem, value: boolean) => {
      const path = ['props', 'public']
      const _repositoryItem = Objects.setInPath({ obj: Objects.cloneDeep(repositoryItem), path, value })
      const upsertParams = { assessmentName, cycleName, countryIso, repositoryItem: _repositoryItem }
      dispatch(RepositoryActions.upsertRepositoryItem(upsertParams))
    },
    [assessmentName, countryIso, cycleName, dispatch]
  )
}

type UseUpdateRepositoryItemsAccessParams = {
  repositoryItems: Array<RepositoryItem>
  value: boolean
}

type ReturnedUpdateRepositoryItemsAccess = (params: UseUpdateRepositoryItemsAccessParams) => void

export const useUpdateRepositoryItemsAccess = (): ReturnedUpdateRepositoryItemsAccess => {
  const updateRepositoryItemsAccess = useUpdateRepositoryItemAccess()
  return useCallback<ReturnedUpdateRepositoryItemsAccess>(
    (params: UseUpdateRepositoryItemsAccessParams) => {
      const { repositoryItems, value } = params
      repositoryItems.forEach((repositoryItem: RepositoryItem) => {
        updateRepositoryItemsAccess(repositoryItem, value)
      })
    },
    [updateRepositoryItemsAccess]
  )
}
