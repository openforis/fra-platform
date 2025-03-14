import { Draft } from '@reduxjs/toolkit'

import { DataState } from 'client/store/data/state'

export const resetHistoryActivities = (state: Draft<DataState>) => {
  state.history.activities = {}

  return state
}
