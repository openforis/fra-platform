import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { ActivityLog } from 'meta/assessment/activityLog'
import { HistoryTarget } from 'meta/cycleData/historyActivities'

import { DataState } from 'client/store/data/state'

type Action = PayloadAction<{
  datum: ActivityLog<never>
  target: HistoryTarget
}>

export const toggleHistoryActivitiesCompareItem = (state: Draft<DataState>, action: Action) => {
  const { datum, target } = action.payload

  if (state.history.activities?.compareItem?.[target]?.id === datum.id) {
    Objects.unset(state.history.activities.compareItem, [target])
  } else {
    const path = ['history', 'activities', 'compareItem', target]
    Objects.setInPath({ obj: state, path, value: datum })
  }
}
