import { createSlice, Reducer, SliceCaseReducers } from '@reduxjs/toolkit'

import { getSections } from './actions/getSections'
import { initApp } from './actions/initApp'
import { updateCountry } from './actions/updateCountry'
import { AssessmentState } from './stateType'

export const assessmentSlice = createSlice<AssessmentState, SliceCaseReducers<AssessmentState>>({
  name: 'assessment',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initApp.fulfilled, (state, { payload }) => {
      const { assessment, countries, regionGroups } = payload

      state.assessment = assessment
      state.countries = countries.reduce(
        (countiesAcc, country) => ({ ...countiesAcc, [country.countryIso]: country }),
        {}
      )
      state.regionGroups = regionGroups
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
  getSections,
  updateCountry,
  initApp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
