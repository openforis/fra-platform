import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { initApp } from 'client/store/assessment/actions'
import { AssessmentState } from 'client/store/assessment/state'

export const initAppReducer = (builder: ActionReducerMapBuilder<AssessmentState>) => {
  builder.addCase(initApp.fulfilled, (state, action) => {
    const { assessments } = action.payload

    state.appInitialized = true
    state.assessments = assessments
  })
}
