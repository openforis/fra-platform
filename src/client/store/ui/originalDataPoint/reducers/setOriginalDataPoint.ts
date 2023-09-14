import { Draft } from '@reduxjs/toolkit'

import { OriginalDataPoint } from 'meta/assessment'

import { OriginalDataPointState } from 'client/store/ui/originalDataPoint/stateType'

export const setOriginalDataPoint = (
  state: Draft<OriginalDataPointState>,
  { payload }: { payload: OriginalDataPoint }
) => {
  state.data = payload
  state.updating = false
}
