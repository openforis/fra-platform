import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import {
  resetActivities,
  toggleActivities,
  toggleActivitiesCompareItem,
} from 'client/store/data/history/actions/activities'
import { HistoryState } from 'client/store/data/history/state'

export const activitiesReducer = (builder: ActionReducerMapBuilder<HistoryState>) => {
  builder.addCase(resetActivities, (state) => {
    state.activities = {}
  })

  builder.addCase(toggleActivities, (state, action) => {
    const { labelKey, target } = action.payload

    if (state.activities?.items?.[target]) {
      Objects.unset(state.activities.items, [target])
    } else {
      const path = ['activities', 'items', target]
      Objects.setInPath({ obj: state, path, value: { labelKey, target } })
    }
  })

  builder.addCase(toggleActivitiesCompareItem, (state, action) => {
    const { datum, target } = action.payload

    if (state.activities?.compareItem?.[target]?.id === datum.id) {
      Objects.unset(state.activities.compareItem, [target])
    } else {
      const path = ['activities', 'compareItem', target]
      Objects.setInPath({ obj: state, path, value: datum })
    }
  })
}
