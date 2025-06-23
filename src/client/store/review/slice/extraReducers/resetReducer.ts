import { ActionReducerMapBuilder } from '@reduxjs/toolkit/'

import { reset } from 'client/store/review/actions/reset'
import { initialState, ReviewState } from 'client/store/review/state'

export const resetReducer = (builder: ActionReducerMapBuilder<ReviewState>) => {
  builder.addCase(reset, () => initialState)
}
