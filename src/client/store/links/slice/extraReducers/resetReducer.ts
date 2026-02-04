import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { reset } from 'client/store/links/actions/reset'
import { initialState, LinksState } from 'client/store/links/state'

export const resetReducer = (builder: ActionReducerMapBuilder<LinksState>): void => {
  builder.addCase(reset, () => initialState)
}
