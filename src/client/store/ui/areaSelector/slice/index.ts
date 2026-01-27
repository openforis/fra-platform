import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  AreaSelectorMode,
  AreaSelectorSortBy,
  AreaSelectorSortDirection,
  initialState,
} from 'client/store/ui/areaSelector/state'

import { AreaSelectorSliceName } from './name'

export const AreaSelectorSlice = createSlice({
  name: AreaSelectorSliceName,
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === AreaSelectorMode.collapsed ? AreaSelectorMode.expanded : AreaSelectorMode.collapsed
    },
    setSortBy: (state, action: PayloadAction<AreaSelectorSortBy>) => {
      const { sortBy, sortDirection } = state.filters
      const property = action.payload

      if (sortBy !== property) {
        state.filters.sortBy = property
        state.filters.sortDirection = AreaSelectorSortDirection.desc
      } else if (sortDirection === AreaSelectorSortDirection.desc) {
        state.filters.sortDirection = AreaSelectorSortDirection.asc
      } else {
        state.filters.sortBy = null
        state.filters.sortDirection = null
      }
    },
  },
})
