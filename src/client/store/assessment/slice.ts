import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getAreas, getAssessment, getSections, initApp, updateCountry, updateCountryProperty } from './actions'
import { AssessmentState } from './stateType'

const initialState: AssessmentState = {}

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
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

    builder.addCase(updateCountryProperty.fulfilled, (state, { payload }) => {
      state.countries[payload.countryIso] = payload
    })
  },
})

export const AssessmentActions = {
  ...assessmentSlice.actions,
  initApp,
  getAssessment,
  getAreas,
  getSections,
  updateCountry,
  updateCountryProperty,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
