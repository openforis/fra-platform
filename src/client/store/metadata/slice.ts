import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getSections } from 'client/store/metadata/actions/getSections'
import { getTableSections } from 'client/store/metadata/actions/getTableSections'
import { getSectionsReducer } from 'client/store/metadata/extraReducers/getSectionsReducer'
import { setTableSectionsReducer } from 'client/store/metadata/extraReducers/setTableSectionsReducer'
import { initialState, MetadataState } from 'client/store/metadata/state'

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    getSectionsReducer(builder)
    setTableSectionsReducer(builder)
  },
})

export const MetadataActions = {
  ...metadataSlice.actions,
  getSections,
  getTableSections,
}

export default metadataSlice.reducer as Reducer<MetadataState>
