import { createSlice, Reducer, SliceCaseReducers } from '@reduxjs/toolkit'

import { getAreas, getAssessment, getSections, initApp, updateCountry } from './actions'
import { AssessmentState } from './stateType'

export const assessmentSlice = createSlice<AssessmentState, SliceCaseReducers<AssessmentState>>({
  name: 'assessment',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initApp.fulfilled, (state, { payload }) => {
      const { assessment } = payload

      state.assessment = assessment
    })

    builder.addCase(getAreas.fulfilled, (state, { payload }) => {
      const { countries, regionGroups } = payload

      state.countries = countries.reduce(
        (countriesAcc, country) => ({ ...countriesAcc, [country.countryIso]: country }),
        {}
      )

      state.regionGroups = regionGroups
    })

    builder.addCase(getAssessment.fulfilled, (state, { payload }) => {
      state.assessment = payload
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
  getAssessment,
  getAreas,
  getSections,
  updateCountry,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
