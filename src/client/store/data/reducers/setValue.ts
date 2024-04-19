import { Draft, PayloadAction } from '@reduxjs/toolkit'
import { Objects } from 'utils/objects'

import { DataState } from 'client/store/data/state'

type Payload = {
  path: Array<string>
  value: unknown
}

export const setValue = (state: Draft<DataState>, action: PayloadAction<Payload>) => {
  const { path, value } = action.payload
  Objects.setInPath({ obj: state, path, value })
  return state
}
