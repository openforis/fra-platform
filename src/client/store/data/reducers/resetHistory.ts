import { Draft } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { DataState } from 'client/store/data/stateType'

export const resetHistory = (state: Draft<DataState>) => {
  Objects.unset(state.history, ['items'])

  return state
}
