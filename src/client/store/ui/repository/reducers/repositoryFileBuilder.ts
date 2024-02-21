import { ActionReducerMapBuilder, isAnyOf, isFulfilled } from '@reduxjs/toolkit'

import { getFileMetadata } from 'client/store/ui/repository/actions/getFileMetadata'
import { RepositoryState } from 'client/store/ui/repository/state'

export const repositoryFileReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addMatcher(isAnyOf(isFulfilled(getFileMetadata)), (state, action) => {
    state.loading = false
    state.file = action.payload
  })
}
