import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { getOriginalDataPointHistory } from 'client/store/data/actions/getOriginalDataPointHistory'
import { DataState } from 'client/store/data/state'

export const getOriginalDataPointHistoryReducer = (builder: ActionReducerMapBuilder<DataState>) =>
  builder.addCase(getOriginalDataPointHistory.fulfilled, (state, { meta, payload }) => {
    const { assessmentName, countryIso, cycleName, year } = meta.arg

    Objects.setInPath({
      obj: state,
      path: ['history', 'lastApproved', 'originalDataPoint', assessmentName, cycleName, countryIso, year],
      value: payload,
    })
  })
