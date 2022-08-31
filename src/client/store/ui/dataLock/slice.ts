import { createSlice, Reducer } from '@reduxjs/toolkit'
import { DataLockState } from './stateType'

const initialState: DataLockState = {
  locked: true,
}

export const dataLockSlice = createSlice({
  name: 'dataLock',
  initialState,
  reducers: {
    updateDataLock: (state, action) => {
      state.locked = action.payload
    },
    toggleDataLock: (state) => {
      state.locked = !state.locked
    },
  },
})

export const DataLockActions = {
  ...dataLockSlice.actions,
}

export default dataLockSlice.reducer as Reducer<DataLockState>
