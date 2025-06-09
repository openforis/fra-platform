import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getOriginalDataPointHistory } from 'client/store/data/history/actions/getOriginalDataPointHistory'
import { HistoryState } from 'client/store/data/history/state'

export const getOriginalDataPointHistoryReducer = (builder: ActionReducerMapBuilder<HistoryState>) =>
  builder.addCase(getOriginalDataPointHistory.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName, year } = meta.arg

    const path = ['lastApproved', 'originalDataPoints', assessmentName, cycleName, countryIso, year]
    Objects.setInPath({ obj: state, path, value: payload })
  })
