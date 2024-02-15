import { ActionReducerMapBuilder, isAnyOf, isPending } from '@reduxjs/toolkit'

import { removeRepositoryItem } from 'client/store/ui/repository/actions/removeRepositoryItem'
import { upsertRepositoryItem } from 'client/store/ui/repository/actions/upsertRepositoryItem'
import { RepositoryState } from 'client/store/ui/repository/state'

export const repositoryItemReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addMatcher(isAnyOf(isPending(upsertRepositoryItem), isPending(removeRepositoryItem)), (state) => {
    state.loading = true
  })

  builder.addMatcher(isAnyOf(upsertRepositoryItem.fulfilled, removeRepositoryItem.fulfilled), (state) => {
    state.loading = false
    state.repositoryItem = undefined
  })

  builder.addMatcher(isAnyOf(upsertRepositoryItem.rejected, removeRepositoryItem.rejected), (state) => {
    state.loading = false
  })
}
