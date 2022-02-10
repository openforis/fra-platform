import { createSlice, Reducer } from '@reduxjs/toolkit'
import { OriginalDataPointState } from './stateType'
import { getOriginalDataPoint } from './actions/getOriginalDataPoint'

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
  },
})

export const OriginalDataPointActions = {
  ...originalDataPointSlice.actions,
  getOriginalDataPoint,
}

export default originalDataPointSlice.reducer as Reducer<OriginalDataPointState>
