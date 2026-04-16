import { useCallback } from 'react'
import axios from 'axios'

import { ApiEndPoint } from 'meta/api/endpoint'
import { CountryIso } from 'meta/area/countryIso'
import { RepositoryItem } from 'meta/cycleData/repository/item'
import { Objects } from 'utils/objects'

import { useCountryRouteParams } from 'client/hooks/routeParams'

type Returned = {
  (repositoryItem: RepositoryItem, value: boolean): void
}

export const useUpdateRepositoryItemAccess = (): Returned => {
  const { assessmentName, countryIso, cycleName } = useCountryRouteParams<CountryIso>()
  return useCallback<Returned>(
    (repositoryItem: RepositoryItem, value: boolean) => {
      const path = ['props', 'public']
      const _repositoryItem = Objects.setInPath({ obj: Objects.cloneDeep(repositoryItem), path, value })
      const params = { assessmentName, countryIso, cycleName }
      axios.put(ApiEndPoint.CycleData.Repository.one(), { repositoryItem: _repositoryItem }, { params })
    },
    [assessmentName, countryIso, cycleName]
  )
}

type UseUpdateRepositoryItemsAccessParams = {
  repositoryItems: Array<RepositoryItem>
  value: boolean
}

type ReturnedUpdateRepositoryItemsAccess = (params: UseUpdateRepositoryItemsAccessParams) => void

export const useUpdateRepositoryItemsAccess = (): ReturnedUpdateRepositoryItemsAccess => {
  const updateRepositoryItemAccess = useUpdateRepositoryItemAccess()
  return useCallback<ReturnedUpdateRepositoryItemsAccess>(
    ({ repositoryItems, value }: UseUpdateRepositoryItemsAccessParams) => {
      repositoryItems.forEach((repositoryItem: RepositoryItem) => {
        updateRepositoryItemAccess(repositoryItem, value)
      })
    },
    [updateRepositoryItemAccess]
  )
}
