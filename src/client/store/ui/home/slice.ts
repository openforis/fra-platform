import { createSlice } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'

import { ApplicationActions } from 'client/store/application/actions'

import { HomeState } from './stateType'

const initialState: HomeState = {}

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    updateCountriesFilter: (state: HomeState, action: { payload: Array<CountryIso> }) => {
      state.countriesFilter = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(ApplicationActions.initApp.fulfilled, () => initialState)
  },
})

export const HomeActions = {
  ...homeSlice.actions,
}

export default homeSlice.reducer
