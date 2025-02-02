import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getOriginalDataPointHistory } from 'client/store/ui/originalDataPoint/actions/getOriginalDataPointHistory'
import { OriginalDataPointState } from 'client/store/ui/originalDataPoint/stateType'

export const getOriginalDataPointHistoryReducer = (builder: ActionReducerMapBuilder<OriginalDataPointState>) =>
  builder.addCase(getOriginalDataPointHistory.fulfilled, (state, { payload }) => {
    Objects.setInPath({ obj: state, path: ['history'], value: payload })
  })
