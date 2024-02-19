import { createSelector } from '@reduxjs/toolkit'

import { ApiEndPoint } from 'meta/api/endpoint'
import { RepositoryItem } from 'meta/cycleData'

import { RootState, useAppSelector } from 'client/store'

const _repositoryItemsSelector = createSelector(
  (state: RootState) => state.ui.tablePaginated,
  (tablePaginated) => tablePaginated[ApiEndPoint.CycleData.Repository.many()]?.data as unknown as Array<RepositoryItem>
)

export const useRepositoryItems = (): Array<RepositoryItem> | undefined => {
  return useAppSelector(_repositoryItemsSelector)
}
