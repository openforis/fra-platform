import { createSelector } from '@reduxjs/toolkit'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData'

import { useAppSelector } from 'client/store/hooks'
import { RootState } from 'client/store/types'

const _repositoryItemsSelector = createSelector(
  (state: RootState) => state.tablePaginated,
  (tablePaginated) =>
    tablePaginated?.[ApiEndPoint.CycleData.Repository.many()]?.data as unknown as Array<RepositoryItem>
)

export const useRepositoryItems = (): Array<RepositoryItem> | undefined => {
  return useAppSelector(_repositoryItemsSelector)
}
