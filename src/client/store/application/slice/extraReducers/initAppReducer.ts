import { ActionReducerMapBuilder } from '@reduxjs/toolkit'

import { initApp } from 'client/store/application/actions/initApp'
import { ApplicationState } from 'client/store/application/state'

export const initAppReducer = (builder: ActionReducerMapBuilder<ApplicationState>) => {
  builder.addCase(initApp.fulfilled, (state) => {
    state.appInitialized = true
  })
}
