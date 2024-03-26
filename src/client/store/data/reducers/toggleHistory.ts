import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { HistoryItemSectionKey } from 'meta/cycleData'

import { DataState } from 'client/store/data/stateType'

type Payload = {
  sectionLabelKey: string
  sectionKey: HistoryItemSectionKey
}

export const toggleHistory = (state: Draft<DataState>, action: PayloadAction<Payload>) => {
  if (state.history.items) {
    Objects.unset(state.history, ['items'])
    return state
  }

  state.history.items = {
    [action.payload.sectionKey]: {
      sectionLabelKey: action.payload.sectionLabelKey,
      sectionKey: action.payload.sectionKey,
    },
  }
  return state
}
