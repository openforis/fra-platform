import { createSelector } from '@reduxjs/toolkit'

import { RootState } from 'client/store/types'

const getState = (state: RootState) => state.application

const isAppInitialized = createSelector([getState], (state) => state.appInitialized === true)

export const ApplicationSelectors = {
  isAppInitialized,
}
