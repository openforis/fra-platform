import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/RootState'
import { RepositorySlice } from 'client/store/ui/repository/slice'

const _getState = (state: RootState) => state.ui[RepositorySlice.name]
const isLoading = createSelector(_getState, (repository) => repository.loading)

export const RepositorySelectors = {
  isLoading,
}
