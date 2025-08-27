import { createSlice } from '@reduxjs/toolkit'

import { AreaSelectorMode, initialState } from 'client/store/ui/areaSelector/state'

import { AreaSelectorSliceName } from './name'

export const AreaSelectorSlice = createSlice({
  name: AreaSelectorSliceName,
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === AreaSelectorMode.collapsed ? AreaSelectorMode.expanded : AreaSelectorMode.collapsed
    },
  },
})
