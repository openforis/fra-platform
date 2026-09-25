import { createSlice } from '@reduxjs/toolkit'

import { initialState } from 'client/store/ui/consent/state'

import { ConsentSliceName } from './name'

export const ConsentSlice = createSlice({
  name: ConsentSliceName,
  initialState,
  reducers: {
    close: (state) => {
      state.isOpen = false
    },
    open: (state) => {
      state.isOpen = true
    },
  },
})
