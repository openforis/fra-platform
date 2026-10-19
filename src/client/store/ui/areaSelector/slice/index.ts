import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CountryStatus } from 'meta/area/countryStatus'
import { Objects } from 'utils/objects'

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

type ToggleStatusFilterPayload = {
  roleName: string
  status: CountryStatus
}

type ResetStatusFilterPayload = {
  roleName: string
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
      const current = state.filters[roleName]?.orderBy

      if (current?.sortBy !== property) {
        const value = { sortBy: property, sortDirection: AreaSelectorSortDirection.desc }
        Objects.setInPath({ obj: state.filters, path: [roleName, 'orderBy'], value })
      } else if (current.sortDirection === AreaSelectorSortDirection.desc) {
        const value = { sortBy: property, sortDirection: AreaSelectorSortDirection.asc }
        Objects.setInPath({ obj: state.filters, path: [roleName, 'orderBy'], value })
      } else {
        delete state.filters[roleName].orderBy
      }
    },
    toggleStatusFilter: (state, action: PayloadAction<ToggleStatusFilterPayload>) => {
      const { roleName, status } = action.payload
      const current = state.filters[roleName]?.statusFilter ?? []
      const updated = current.includes(status) ? current.filter((s) => s !== status) : [...current, status]

      if (Objects.isEmpty(updated)) {
        delete state.filters[roleName].statusFilter
      } else {
        Objects.setInPath({ obj: state.filters, path: [roleName, 'statusFilter'], value: updated })
      }
    },
    resetStatusFilter: (state, action: PayloadAction<ResetStatusFilterPayload>) => {
      const { roleName } = action.payload
      delete state.filters[roleName].statusFilter
    },
  },
})
