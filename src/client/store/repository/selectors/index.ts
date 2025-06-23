import { createSelector } from '@reduxjs/toolkit'

import { RepositorySlice } from 'client/store/repository/slice'
import { RootState } from 'client/store/types'

const getState = (state: RootState) => state[RepositorySlice.name]
const isLoading = createSelector(getState, (repository) => repository.loading)
const getRepositoryFileMeta = createSelector(getState, (repository) => repository.fileMeta)
const getRepositoryItem = createSelector(getState, (repository) => repository.repositoryItem)
const getRepositoryItemValidation = createSelector(getState, (repository) => repository.repositoryItemValidation)

export const RepositorySelectors = {
  getRepositoryFileMeta,
  getRepositoryItem,
  getRepositoryItemValidation,
  isLoading,
}
