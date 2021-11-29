import { createSlice, Reducer } from '@reduxjs/toolkit'
import { AssessmentState } from './stateType'
import { initApp } from './actions/initApp'

const initialState: AssessmentState = {}

export const appSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(initApp.fulfilled, (_, { payload }) => payload)
  },
})

export const AppActions = {
  initApp,
}

export default appSlice.reducer as Reducer<AssessmentState>
