import { createSlice } from '@reduxjs/toolkit'

import { CountryIso } from 'meta/area'

import { AssessmentActions } from 'client/store/assessment'

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
    builder.addCase(AssessmentActions.initApp.fulfilled, () => initialState)
  },
})

export const HomeActions = {
  ...homeSlice.actions,
}

export default homeSlice.reducer
