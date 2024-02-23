import { ActionReducerMapBuilder, isAnyOf, isFulfilled } from '@reduxjs/toolkit'

import { getFileMeta } from 'client/store/ui/repository/actions/getFileMeta'
import { RepositoryState } from 'client/store/ui/repository/state'

export const fileMetaReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addMatcher(isAnyOf(isFulfilled(getFileMeta)), (state, action) => {
    state.loading = false
    state.fileMeta = action.payload
  })
}
