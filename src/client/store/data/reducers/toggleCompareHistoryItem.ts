import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { ActivityLog } from 'meta/assessment'
import { HistoryTarget } from 'meta/cycleData'

import { DataState } from 'client/store/data/state'

type Action = PayloadAction<{
  datum: ActivityLog<never>
  target: HistoryTarget
}>

export const toggleCompareHistoryItem = (state: Draft<DataState>, action: Action) => {
  const { datum, target } = action.payload

  if (state.history.compareItem?.[target]?.id === datum.id) {
    Objects.unset(state.history.compareItem, [target])
  } else {
    const path = ['history', 'compareItem', target]
    Objects.setInPath({ obj: state, path, value: datum })
  }
}
