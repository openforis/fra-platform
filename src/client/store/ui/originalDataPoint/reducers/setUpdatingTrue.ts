import { Draft } from '@reduxjs/toolkit'

import { OriginalDataPointState } from 'client/store/ui/originalDataPoint/stateType'

export const setUpdatingTrue = (state: Draft<OriginalDataPointState>) => {
  state.updating = true
}
