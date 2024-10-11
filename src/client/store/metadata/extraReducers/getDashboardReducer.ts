import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { getDashboard } from 'client/store/metadata/actions/getDashboard'
import { MetadataState } from 'client/store/metadata/state'

export const getDashboardReducer = (builder: ActionReducerMapBuilder<MetadataState>): void => {
  builder.addCase(getDashboard.fulfilled, (state, action) => {
    const { assessmentName, cycleName } = action.meta.arg
    if (!state.dashboard[assessmentName]) {
      state.dashboard[assessmentName] = {}
    }
    state.dashboard[assessmentName][cycleName] = action.payload
  })
}
