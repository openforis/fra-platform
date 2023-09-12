import { createSlice } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'

import { initApp } from 'client/store/assessment/actions'

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
    builder.addCase(initApp.fulfilled, () => initialState)
  },
})

export const HomeActions = {
  ...homeSlice.actions,
}

export default homeSlice.reducer
