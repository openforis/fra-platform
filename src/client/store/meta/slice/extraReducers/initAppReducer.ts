import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { ApplicationActions } from 'client/store/application/actions'
import { MetaState } from 'client/store/meta/state'

export const initAppReducer = (builder: ActionReducerMapBuilder<MetaState>): void => {
  builder.addCase(ApplicationActions.initApp.fulfilled, (state, action) => {
    const { assessments } = action.payload

    state.assessments = assessments
  })
}
