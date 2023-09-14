import { createSlice, PayloadAction, Reducer } from '@reduxjs/toolkit'

import { ODPReservedYear } from 'meta/assessment'

import { getOriginalDataPointReservedYears } from 'client/store/ui/originalDataPoint/actions/getOriginalDataPointReservedYears'

import { copyPreviousNationalClasses } from './actions/copyPreviousNationalClasses'
import { createOriginalDataPoint } from './actions/createOriginalDataPoint'
import { deleteOriginalDataPoint } from './actions/deleteOriginalDataPoint'
import { getOriginalDataPoint } from './actions/getOriginalDataPoint'
import { pasteNationalClass } from './actions/pasteNationalClass'
import { updateNationalClass } from './actions/updateNationalClass'
import { updateOriginalDataPoint } from './actions/updateOriginalDataPoint'
import { updateOriginalDataPointDataSources } from './actions/updateOriginalDataPointDataSources'
import { OriginalDataPointState } from './stateType'

const initialState: OriginalDataPointState = { data: null, reservedYears: null }

export const originalDataPointSlice = createSlice({
  name: 'originalDataPoint',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getOriginalDataPoint.fulfilled, (state, { payload }) => {
      state.data = payload
    })
    builder.addCase(updateOriginalDataPoint.fulfilled, (state, { payload }) => {
      state.data = payload
      state.updating = false
    })
    builder.addCase(updateOriginalDataPoint.pending, (state) => {
      state.updating = true
    })
    builder.addCase(updateOriginalDataPointDataSources.fulfilled, (state, { payload }) => {
      state.data = payload
      state.updating = false
    })
    builder.addCase(updateOriginalDataPointDataSources.pending, (state) => {
      state.updating = true
    })
    builder.addCase(createOriginalDataPoint.fulfilled, (state, { payload }) => {
      state.data = payload
      state.updating = false
    })

    builder.addCase(
      getOriginalDataPointReservedYears.fulfilled,
      (state, { payload }: PayloadAction<Array<ODPReservedYear>>) => {
        state.reservedYears = payload
      }
    )
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
  getOriginalDataPoint,
  pasteNationalClass,
  updateNationalClass,
  createOriginalDataPoint,
  deleteOriginalDataPoint,
  updateOriginalDataPoint,
  updateOriginalDataPointDataSources,
  copyPreviousNationalClasses,
  getOriginalDataPointReservedYears,
}

export default originalDataPointSlice.reducer as Reducer<OriginalDataPointState>
