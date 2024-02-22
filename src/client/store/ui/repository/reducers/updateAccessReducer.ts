import { ActionReducerMapBuilder, isFulfilled } from '@reduxjs/toolkit'

import { updateRepositoryItemAccess } from 'client/store/ui/repository/actions/updateRepositoryAccess'
import { RepositoryState } from 'client/store/ui/repository/state'

export const updateAccessReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addMatcher(isFulfilled(updateRepositoryItemAccess), (state, action) => {
    state.repositoryItem = action.payload
    state.loading = false
  })
}
