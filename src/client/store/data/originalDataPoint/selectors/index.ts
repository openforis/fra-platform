import { createSelector } from '@reduxjs/toolkit'

import { OriginalDataPointState } from 'client/store/data/originalDataPoint/state'
import { RootState } from 'client/store/types'

const getState = (state: RootState): OriginalDataPointState => state.data.originalDataPoint

const getOriginalDataPoint = createSelector(getState, (state) => state?.data)

const isOriginalDataPointUpdating = createSelector(getState, (state) => state?.updating)

const getOriginalDataPointReservedYears = createSelector(getState, (state) => state?.reservedYears)

export const OriginalDataPointSelectors = {
  getOriginalDataPoint,
  isOriginalDataPointUpdating,
  getOriginalDataPointReservedYears,
}
