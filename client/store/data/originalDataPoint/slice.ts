import { createSlice, Reducer } from '@reduxjs/toolkit'
import { OriginalDataPointState } from './stateType'
import { fetchOriginalDataPoint } from './actions/fetchOriginalDataPoint'

const initialState: OriginalDataPointState = null

export const originalDataPointSlice = createSlice({
  name: 'originalDataPoint',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOriginalDataPoint.fulfilled, (_, { payload }) => payload)
  },
})

export const OriginalDataPointActions = {
  fetchOriginalDataPoint,
}

export default originalDataPointSlice.reducer as Reducer<OriginalDataPointState>
