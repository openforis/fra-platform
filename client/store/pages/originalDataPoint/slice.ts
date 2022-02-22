import { createSlice, Reducer } from '@reduxjs/toolkit'
import { OriginalDataPointState } from './stateType'
import { getOriginalDataPoint } from './actions/getOriginalDataPoint'
import { pasteNationalClass } from './actions/pasteNationalClass'
import { updateNationalClass } from './actions/updateNationalClass'
import { updateOriginalDataPoint } from './actions/updateOriginalDataPoint'

const initialState: OriginalDataPointState = { data: null }

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
    })
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
  getOriginalDataPoint,
  pasteNationalClass,
  updateNationalClass,
  updateOriginalDataPoint,
}

export default originalDataPointSlice.reducer as Reducer<OriginalDataPointState>
