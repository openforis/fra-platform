import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { DataState } from 'client/store/data/state'

export const toggleHistoryLastApproved = (state: Draft<DataState>, action: PayloadAction<boolean | undefined>) => {
  const active = action.payload ?? !state.history?.lastApproved?.active
  const path = ['history', 'lastApproved', 'active']

  Objects.setInPath({ obj: state, path, value: active })

  return state
}
