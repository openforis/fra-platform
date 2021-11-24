import { createSlice } from '@reduxjs/toolkit'
import { AutosaveState } from '../../store/autosave/autosaveStateType'

const initialState: AutosaveState = {}

export const autosaveSlice = createSlice({
  name: 'autosave',
  initialState,
  reducers: {
    autoSaveStart: (state) => {
      state.status = 'saving'
    },
    autoSaveComplete: (state) => {
      state.status = 'completed'
    },
    lastSectionUpdateTimestampReceived: (state, { payload }) => {
      state.status = 'lastSaveTimestampReceived'
      state.lastSaveTimeStamp = payload
    },
    lastSectionUpdateTimestampReset: () => initialState,
  },
})

export const AutosaveActions = {
  ...autosaveSlice.actions,
}

export default autosaveSlice.reducer
