import { createSlice, Reducer } from '@reduxjs/toolkit'

import { initialState, MetadataState } from 'client/store/metadata/state'

import { getTableSections } from './actions/getTableSections'
import { setTableSections } from './actions/setTableSections'

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Table Sections
    builder.addCase(setTableSections, (state, { payload }) => {
      const { tableSections, assessmentName, cycleName } = payload

      // set table sections metadata
      if (!state.tableSections[assessmentName]) state.tableSections[assessmentName] = {}
      if (!state.tableSections[assessmentName][cycleName]) state.tableSections[assessmentName][cycleName] = {}

      state.tableSections[assessmentName][cycleName] = {
        ...state.tableSections[assessmentName][cycleName],
        ...tableSections,
      }
    })
  },
})

export const MetadataActions = {
  ...metadataSlice.actions,
  getTableSections,
}

export default metadataSlice.reducer as Reducer<MetadataState>
