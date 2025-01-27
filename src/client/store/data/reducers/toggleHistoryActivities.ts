import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { DataState, HistoryActivitiesItemState } from 'client/store/data/state'

export const toggleHistoryActivities = (state: Draft<DataState>, action: PayloadAction<HistoryActivitiesItemState>) => {
  const { labelKey, target } = action.payload

  if (state.history.activities?.items?.[target]) {
    Objects.unset(state.history.activities.items, [target])
  } else {
    const path = ['history', 'activities', 'items', target]
    Objects.setInPath({ obj: state, path, value: { labelKey, target } })
  }
  return state
}
