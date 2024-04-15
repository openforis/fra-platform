import { Draft } from '@reduxjs/toolkit'

import { DataState } from 'client/store/data/state'

export const resetHistory = (state: Draft<DataState>) => {
  state.history = {}

  return state
}
