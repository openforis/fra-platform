import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { reset } from 'client/store/data/originalDataPoint/actions/reset'
import { initialState, OriginalDataPointState } from 'client/store/data/originalDataPoint/state'

export const resetReducer = (builder: ActionReducerMapBuilder<OriginalDataPointState>) => {
  builder.addCase(reset, () => initialState)
}
