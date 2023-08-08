import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getMetaCacheReducer } from 'client/store/assessment/extraReducers/getMetaCacheReducer'
import { updateNodeValues } from 'client/store/data/actions/updateNodeValues'

import { initAppReducer } from './extraReducers/initAppReducer'
import {
  getAreas,
  getAssessment,
  getMetaCache,
  getSections,
  initApp,
  updateCountry,
  updateCountryProp,
} from './actions'
import { AssessmentState, initialState } from './state'

export const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    initAppReducer(builder)
    getMetaCacheReducer(builder)

    builder.addCase(getAreas.fulfilled, (state, { payload }) => {
      const { countries, regionGroups } = payload

      state.countries = countries.reduce(
        (countriesAcc, country) => ({ ...countriesAcc, [country.countryIso]: country }),
        {}
      )

      state.regionGroups = regionGroups
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
  getMetaCache,
  getSections,
  updateCountry,
  updateCountryProp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
