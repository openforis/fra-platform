import { createSlice, Reducer, SliceCaseReducers } from '@reduxjs/toolkit'

import { getCountries, getSections, initApp, updateCountry } from './actions'
import { AssessmentState } from './stateType'

export const assessmentSlice = createSlice<AssessmentState, SliceCaseReducers<AssessmentState>>({
  name: 'assessment',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initApp.fulfilled, (state, { payload }) => {
      const { assessment, regionGroups } = payload

      state.assessment = assessment

      state.regionGroups = regionGroups
    })

    builder.addCase(getCountries.fulfilled, (state, { payload }) => {
      state.countries = payload.reduce(
        (countriesAcc, country) => ({ ...countriesAcc, [country.countryIso]: country }),
        {}
      )
    })

    builder.addCase(getSections.fulfilled, (state, { payload }) => {
      state.sections = payload
    })

    builder.addCase(updateCountry.fulfilled, (state, { payload }) => {
      state.countries[payload.countryIso] = payload
    })
  },
})

export const AssessmentActions = {
  initApp,
  getCountries,
  getSections,
  updateCountry,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
