import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { DataState, HistoryItemState } from 'client/store/data/stateType'

export const toggleHistory = (state: Draft<DataState>, action: PayloadAction<HistoryItemState>) => {
  const { labelKey, target } = action.payload

  if (state.history?.items?.[target]) {
    Objects.unset(state.history.items, [target])
  } else {
    const path = ['history', 'items', target]
    Objects.setInPath({ obj: state, path, value: { labelKey, target } })
  }
  return state
}
