import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  AreaSelectorMode,
  AreaSelectorSortBy,
  AreaSelectorSortDirection,
  initialState,
} from 'client/store/ui/areaSelector/state'

import { AreaSelectorSliceName } from './name'

type SetSortByPayload = {
  roleName: string
  sortBy: AreaSelectorSortBy
}

export const AreaSelectorSlice = createSlice({
  name: AreaSelectorSliceName,
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === AreaSelectorMode.collapsed ? AreaSelectorMode.expanded : AreaSelectorMode.collapsed
    },
    setSortBy: (state, action: PayloadAction<SetSortByPayload>) => {
      const { roleName, sortBy: property } = action.payload
      const current = state.filters.orderBy[roleName]

      if (current?.sortBy !== property) {
        state.filters.orderBy[roleName] = { sortBy: property, sortDirection: AreaSelectorSortDirection.desc }
      } else if (current.sortDirection === AreaSelectorSortDirection.desc) {
        state.filters.orderBy[roleName] = { sortBy: property, sortDirection: AreaSelectorSortDirection.asc }
      } else {
        delete state.filters.orderBy[roleName]
      }
    },
  },
})
