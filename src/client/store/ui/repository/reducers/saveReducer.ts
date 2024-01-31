import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { save } from 'client/store/ui/repository/actions/save'
import { RepositoryState } from 'client/store/ui/repository/state'

export const saveReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addCase(save.pending, (state) => {
    state.loading = true
  })
  builder.addCase(save.fulfilled, (state) => {
    state.loading = false
    state.repositoryItem = undefined
  })
  builder.addCase(save.rejected, (state) => {
    state.loading = false
  })
}
