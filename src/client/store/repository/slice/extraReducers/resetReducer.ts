import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { reset } from 'client/store/repository/actions/reset'
import { initialState, RepositoryState } from 'client/store/repository/state'

export const resetReducer = (builder: ActionReducerMapBuilder<RepositoryState>) => {
  builder.addCase(reset, () => initialState)
}
