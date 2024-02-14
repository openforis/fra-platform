import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { getRepositoryItems } from 'client/store/ui/repository/actions/getRepositoryItems'
import { RepositoryState } from 'client/store/ui/repository/state'

export const repositoryItemsReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addCase(getRepositoryItems.fulfilled, (state, { payload }) => {
    state.repositoryItems = payload
  })
}
