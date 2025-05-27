import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { ApplicationActions } from 'client/store/application/actions'
import { AssessmentState } from 'client/store/meta/assessment/state'

export const initAppReducer = (builder: ActionReducerMapBuilder<AssessmentState>) => {
  builder.addCase(ApplicationActions.initApp.fulfilled, (state, action) => {
    const { assessments } = action.payload

    state.assessments = assessments
  })
}
