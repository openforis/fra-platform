import { ActionReducerMapBuilder } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { toggleLastApproved } from 'client/store/data/history/actions/lastApproved'
import { HistoryState } from 'client/store/data/history/state'

export const lastApprovedReducer = (builder: ActionReducerMapBuilder<HistoryState>) => {
  builder.addCase(toggleLastApproved, (state, action) => {
    const active = action.payload ?? !state?.lastApproved?.active
    const path = ['lastApproved', 'active']

    Objects.setInPath({ obj: state, path, value: active })
  })
}
