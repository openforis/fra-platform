import { createSlice, Reducer } from '@reduxjs/toolkit'

import { getAreas, getMetaCache, initApp, updateCountry, updateCountryProp } from 'client/store/assessment/actions'
import { getMetaCacheReducer } from 'client/store/assessment/extraReducers/getMetaCacheReducer'
import { initAppReducer } from 'client/store/assessment/extraReducers/initAppReducer'
import { AssessmentState, initialState } from 'client/store/assessment/state'
import { updateNodeValues } from 'client/store/data/actions/updateNodeValues'

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
  getAreas,
  getMetaCache,
  updateCountry,
  updateCountryProp,
}

export default assessmentSlice.reducer as Reducer<AssessmentState>
