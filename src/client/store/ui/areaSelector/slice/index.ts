import { createSlice } from '@reduxjs/toolkit'

import { AreaSelectorMode, initialState } from 'client/store/ui/areaSelector/state'

export const AreaSelectorSlice = createSlice({
  name: 'areaSelector',
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === AreaSelectorMode.collapsed ? AreaSelectorMode.expanded : AreaSelectorMode.collapsed
    },
  },
})
