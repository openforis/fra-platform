import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { removeRepositoryItem } from 'client/store/ui/repository/actions/removeRepositoryItem'
import { RepositoryState } from 'client/store/ui/repository/state'

export const removeRepositoryItemReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addCase(removeRepositoryItem.pending, (state) => {
    state.loading = true
  })
  builder.addCase(removeRepositoryItem.fulfilled, (state) => {
    state.loading = false
    state.repositoryItem = undefined
  })
  builder.addCase(removeRepositoryItem.rejected, (state) => {
    state.loading = false
  })
}
