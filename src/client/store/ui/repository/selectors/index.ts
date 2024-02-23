import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/RootState'
import { RepositorySlice } from 'client/store/ui/repository/slice'

const _getState = (state: RootState) => state.ui[RepositorySlice.name]
const isLoading = createSelector(_getState, (repository) => repository.loading)
const getRepositoryFileMeta = createSelector(_getState, (repository) => repository.fileMeta)
const getRepositoryItem = createSelector(_getState, (repository) => repository.repositoryItem)
const getRepositoryItemValidation = createSelector(_getState, (repository) => repository.repositoryItemValidation)

export const RepositorySelectors = {
  getRepositoryFileMeta,
  getRepositoryItem,
  getRepositoryItemValidation,
  isLoading,
}
