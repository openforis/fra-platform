import { createSlice, Reducer } from '@reduxjs/toolkit'
import { GeoState } from './stateType'
import { postMosaicOptions } from './actions/postMosaicOptions'

const initialState: GeoState = {
  selectedPanel: null,
  mosaicOptions: {
    sources: [],
  },
  mosaicUrl: '',
}

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    updateMosaicOptions: (state, { payload }) => {
      state.mosaicOptions = payload
    },
    updateSelectedPanel: (state, { payload }) => {
      state.selectedPanel = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postMosaicOptions.fulfilled, (state, { payload }) => {
      state.mosaicUrl = payload.urlTemplate
    })
  },
})

export const GeoActions = {
  ...geoSlice.actions,
  postMosaicOptions,
}

export default geoSlice.reducer as Reducer<GeoState>
