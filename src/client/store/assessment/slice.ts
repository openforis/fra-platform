import { createSlice, Reducer } from '@reduxjs/toolkit'

import { updateNodeValues } from '../data/actions/updateNodeValues'
import { getAreas, getAssessment, getSections, initApp, updateCountry, updateCountryProp } from './actions'
import { AssessmentState } from './stateType'

const initialState: AssessmentState = {
  appInitialized: false,
}

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
      state.countries[payload.countryIso] = { ...state.countries[payload.countryIso], ...payload }
    })

    builder.addCase(updateCountryProp.pending, (state, reducer) => {
      const {
        meta: { arg },
      } = reducer

      const { countryIso, countryProp } = arg

      state.countries[countryIso].props = { ...state.countries[countryIso].props, ...countryProp }
    })

    builder.addCase(initApp.pending, (state) => {
      state.appInitialized = false
    })

    builder.addCase(initApp.fulfilled, (state) => {
      state.appInitialized = true
    })

    builder.addCase(updateNodeValues.fulfilled, (state, payload) => {
      const { countryIso } = payload.meta.arg
      if (state.countries[countryIso]) state.countries[countryIso].lastEdit = new Date().toISOString()
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
  updateCountryProp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
