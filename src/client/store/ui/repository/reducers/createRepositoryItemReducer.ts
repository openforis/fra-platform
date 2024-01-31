import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { createRepositoryItem } from 'client/store/ui/repository/actions/createRepositoryItem'
import { RepositoryState } from 'client/store/ui/repository/state'

export const createRepositoryItemReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addCase(createRepositoryItem.pending, (state) => {
    state.loading = true
  })
  builder.addCase(createRepositoryItem.fulfilled, (state) => {
    state.loading = false
    state.repositoryItem = undefined
  })
  builder.addCase(createRepositoryItem.rejected, (state) => {
    state.loading = false
  })
}
