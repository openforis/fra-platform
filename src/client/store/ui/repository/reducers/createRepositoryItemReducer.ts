import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { upsertRepositoryItem } from 'client/store/ui/repository/actions/upsertRepositoryItem'
import { RepositoryState } from 'client/store/ui/repository/state'

export const createRepositoryItemReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addCase(upsertRepositoryItem.pending, (state) => {
    state.loading = true
  })
  builder.addCase(upsertRepositoryItem.fulfilled, (state) => {
    state.loading = false
    state.repositoryItem = undefined
  })
  builder.addCase(upsertRepositoryItem.rejected, (state) => {
    state.loading = false
  })
}
