import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getOriginalDataPointHistory } from '../actions/getOriginalDataPointHistory'
import { OriginalDataPointState } from '../stateType'

export const getOriginalDataPointHistoryReducer = (builder: ActionReducerMapBuilder<OriginalDataPointState>) =>
  builder.addCase(getOriginalDataPointHistory.fulfilled, (state, { payload }) => {
    Objects.setInPath({ obj: state, path: ['history'], value: payload })
  })
